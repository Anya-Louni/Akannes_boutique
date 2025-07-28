'use server';

import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, limit } from 'firebase/firestore';
import { db } from './firebase';
import type { Product, ProductFormValues } from './types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const productsCollection = collection(db, 'products');

const ProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Please select a category'),
  sizes: z.array(z.string()).min(1, 'Please select at least one size'),
  colors: z.array(z.string()).min(1, 'Please add at least one color'),
  styleTags: z.array(z.string()).min(1, 'Please add at least one style tag'),
  images: z.array(z.string().url()).min(1, 'Please add at least one image URL'),
  inStock: z.boolean(),
  isFeatured: z.boolean(),
});


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
