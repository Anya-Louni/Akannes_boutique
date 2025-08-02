import { collection, addDoc, getDocs, query, where, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Category } from './types';

const categoriesCollection = collection(db, 'categories');

// Function to add a new category
export async function addCategory(name: string): Promise<string> {
  // Check if category already exists (case-insensitive)
  const q = query(categoriesCollection, where('name_lowercase', '==', name.toLowerCase()));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    throw new Error(`Category "${name}" already exists.`);
  }

  const docRef = await addDoc(categoriesCollection, {
    name: name,
    name_lowercase: name.toLowerCase(), // Store a lowercase version for case-insensitive checks
    createdAt: new Date(),
  });
  return docRef.id;
}

// Function to get all categories
export async function getCategories(): Promise<Category[]> {
  const snapshot = await getDocs(categoriesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
}

// Function to delete a category
export async function deleteCategory(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'categories', id));
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category');
  }
}
