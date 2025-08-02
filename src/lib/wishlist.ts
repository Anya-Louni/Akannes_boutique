import { collection, doc, addDoc, deleteDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { WishlistItem, Product } from './types';

export const addToWishlist = async (userId: string, productId: string): Promise<string> => {
  try {
    // Check if item already exists in wishlist
    const existingItem = await getWishlistItem(userId, productId);
    if (existingItem) {
      throw new Error('Item already in wishlist');
    }

    const docRef = await addDoc(collection(db, 'wishlist'), {
      userId,
      productId,
      createdAt: Timestamp.now(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (userId: string, productId: string): Promise<void> => {
  try {
    const wishlistItem = await getWishlistItem(userId, productId);
    if (!wishlistItem) {
      throw new Error('Item not found in wishlist');
    }

    await deleteDoc(doc(db, 'wishlist', wishlistItem.id));
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

export const getWishlistItem = async (userId: string, productId: string): Promise<WishlistItem | null> => {
  try {
    const q = query(
      collection(db, 'wishlist'), 
      where('userId', '==', userId),
      where('productId', '==', productId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    } as WishlistItem;
  } catch (error) {
    console.error('Error getting wishlist item:', error);
    return null;
  }
};

export const getUserWishlist = async (userId: string): Promise<WishlistItem[]> => {
  try {
    const q = query(
      collection(db, 'wishlist'), 
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    } as WishlistItem));
  } catch (error) {
    console.error('Error getting user wishlist:', error);
    return [];
  }
};

export const isInWishlist = async (userId: string, productId: string): Promise<boolean> => {
  const item = await getWishlistItem(userId, productId);
  return item !== null;
};
