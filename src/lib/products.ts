'use server';

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, limit } from 'firebase/firestore';
import { db } from './firebase';
import type { Product, ProductFormValues } from './types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const productsCollection = collection(db, 'products');

// Schema for new products is now defined inside the action
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
    // Validate with Zod
    const validation = ProductSchema.safeParse(productData);
    if (!validation.success) {
      // Concatenate all errors into a single string
      const errorMessages = validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: `Invalid product data: ${errorMessages}` };
    }

    // Check if slug already exists
    const q = query(productsCollection, where('slug', '==', validation.data.slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return { success: false, error: 'Product slug must be unique.' };
    }
    
    await addDoc(productsCollection, {
        ...validation.data,
        createdAt: new Date(),
    });

    // Revalidate paths to show the new product
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error adding product:', error);
    return { success: false, error: 'An unexpected error occurred while adding the product.' };
  }
}

// Function to get all products
export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}
