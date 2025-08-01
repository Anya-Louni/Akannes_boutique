'use server';

import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, limit } from 'firebase/firestore';
import { db } from './firebase';
import type { Product, ProductFormValues } from './types';
import { ProductSchema } from './types';
import { revalidatePath } from 'next/cache';

const productsCollection = collection(db, 'products');

// Function to add a new product
export async function addProduct(productData: ProductFormValues): Promise<{ success: boolean; error?: string }> {
  try {
    const validation = ProductSchema.safeParse(productData);
    if (!validation.success) {
      const errorMessages = validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: `Invalid product data: ${errorMessages}` };
    }

    const q = query(productsCollection, where('slug', '==', validation.data.slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return { success: false, error: 'Product slug must be unique.' };
    }
    
    await addDoc(productsCollection, {
        ...validation.data,
        createdAt: new Date(),
    });

    revalidatePath('/admin/products');
    revalidatePath('/shop');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error adding product:', error);
    return { success: false, error: 'An unexpected error occurred while adding the product.' };
  }
}

// Function to update an existing product
export async function updateProduct(id: string, productData: ProductFormValues): Promise<{ success: boolean; error?: string }> {
    try {
        const validation = ProductSchema.safeParse(productData);
        if (!validation.success) {
            const errorMessages = validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
            return { success: false, error: `Invalid product data: ${errorMessages}` };
        }

        const productRef = doc(db, 'products', id);
        
        // Check if another product with the new slug already exists
        const q = query(productsCollection, where('slug', '==', validation.data.slug), limit(1));
        const querySnapshot = await getDocs(q);
        const existingProduct = querySnapshot.docs[0];
        if (existingProduct && existingProduct.id !== id) {
             return { success: false, error: 'Product slug must be unique.' };
        }
        
        await updateDoc(productRef, {
            ...validation.data,
            updatedAt: new Date(),
        });

        revalidatePath('/admin/products');
        revalidatePath(`/shop/${validation.data.slug}`);
        revalidatePath('/shop');
        revalidatePath('/');
        
        return { success: true };
    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, error: 'An unexpected error occurred while updating the product.' };
    }
}

// Function to delete a product
export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        await deleteDoc(doc(db, 'products', id));
        revalidatePath('/admin/products');
        revalidatePath('/shop');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: 'An unexpected error occurred while deleting the product.' };
    }
}

// Function to get all products
export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

// Function to get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
}

// Function to update product inventory
export async function updateProductInventory(productId: string, quantitySold: number): Promise<{ success: boolean; error?: string; outOfStock?: boolean }> {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      return { success: false, error: 'Product not found' };
    }
    
    const currentProduct = productSnap.data() as Product;
    const newQuantity = (currentProduct.stockQuantity || 0) - quantitySold;
    
    if (newQuantity < 0) {
      return { success: false, error: 'Insufficient stock' };
    }
    
    const updateData: any = {
      stockQuantity: newQuantity,
      updatedAt: new Date(),
    };
    
    // If stock reaches 0, mark as out of stock
    if (newQuantity === 0) {
      updateData.inStock = false;
      
      // Here you could add notification logic
      console.log(`🚨 Product "${currentProduct.name}" is now out of stock!`);
    }
    
    await updateDoc(productRef, updateData);
    
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    revalidatePath('/');
    
    return { 
      success: true, 
      outOfStock: newQuantity === 0 
    };
  } catch (error) {
    console.error('Error updating inventory:', error);
    return { success: false, error: 'Failed to update inventory' };
  }
}

// Function to check if product has sufficient stock
export async function checkProductStock(productId: string, quantity: number): Promise<{ available: boolean; currentStock: number }> {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      return { available: false, currentStock: 0 };
    }
    
    const product = productSnap.data() as Product;
    const currentStock = product.stockQuantity || 0;
    
    return {
      available: currentStock >= quantity && product.inStock,
      currentStock
    };
  } catch (error) {
    console.error('Error checking stock:', error);
    return { available: false, currentStock: 0 };
  }
}
