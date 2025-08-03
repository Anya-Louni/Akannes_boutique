'use client';

import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { useState, useEffect } from 'react';

// Dynamic import with no SSR to avoid useSearchParams issues
const ShopClient = dynamic(() => import('@/components/shop/shop-client'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading shop...</div>
});

async function getProducts() {
    try {
        const productsCol = collection(db, 'products');
        const productSnapshot = await getDocs(productsCol);
        const productList = productSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Convert Firestore timestamp to serializable date
            createdAt: data.createdAt?.toDate?.() || new Date(),
          } as unknown as Product;
        });
        return productList;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary text-shadow-magic">
            Our Magical Wardrobe
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Browse our collection of enchanting apparel. Find the perfect piece to complete your look.
          </p>
          <div className="mt-4 flex justify-center">
              <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
        </div>
        <div className="text-center py-8">Loading magical products...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary text-shadow-magic">
          Our Magical Wardrobe
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          Browse our collection of enchanting apparel. Find the perfect piece to complete your look.
        </p>
        <div className="mt-4 flex justify-center">
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
        </div>
      </div>
      <ShopClient products={products} />
    </div>
  );
}
