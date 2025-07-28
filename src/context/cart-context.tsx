
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/lib/types';

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (product: Product, quantity: number, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, quantity: number, size?: string) => {
    setCartItems(prevItems => {
      // Create a unique ID for the cart item based on product ID and size
      const cartId = size ? `${product.id}-${size}` : product.id;
      const existingItem = prevItems.find(item => (item.selectedSize ? `${item.id}-${item.selectedSize}` : item.id) === cartId);

      if (existingItem) {
        // If item with the same size exists, update its quantity
        return prevItems.map(item =>
          (item.selectedSize ? `${item.id}-${item.selectedSize}` : item.id) === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Otherwise, add new item to the cart
        return [...prevItems, { ...product, quantity, selectedSize: size }];
      }
    });
  };

  const removeItem = (productId: string, size?: string) => {
    const cartId = size ? `${productId}-${size}` : productId;
    setCartItems(prevItems => prevItems.filter(item => (item.selectedSize ? `${item.id}-${item.selectedSize}` : item.id) !== cartId));
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    const cartId = size ? `${productId}-${size}` : productId;
    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.selectedSize ? `${item.id}-${item.selectedSize}` : item.id) === cartId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity, clearCart, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
