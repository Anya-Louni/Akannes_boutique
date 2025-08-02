'use server';

import { addCategory, getCategories, deleteCategory } from '@/lib/categories';
import { revalidatePath } from 'next/cache';

export async function createCategory(name: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Basic validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return { success: false, error: 'Category name cannot be empty.' };
    }

    await addCategory(name.trim());
    
    // Revalidate paths to show the new category immediately
    revalidatePath('/admin/categories');
    revalidatePath('/shop');

    return { success: true };
  } catch (error) {
    console.error('Error creating category:', error);
    if (error instanceof Error && error.message.includes('already exists')) {
         return { success: false, error: error.message };
    }
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

export async function removeCategory(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteCategory(id);
    
    // Revalidate paths to update the UI immediately
    revalidatePath('/admin/categories');
    revalidatePath('/shop');

    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: 'Failed to delete category.' };
  }
}

export async function fetchCategories() {
  return await getCategories();
}
