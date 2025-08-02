import ProductCard from '@/components/product/product-card';
import { Sparkles } from 'lucide-react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';

async function getFeaturedProducts() {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('isFeatured', '==', true), limit(4));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            // Convert Firebase Timestamp to Date for serialization
            createdAt: data.createdAt?.toDate?.() || new Date(),
        } as unknown as Product;
    });
}


export async function FeaturedProducts() {
  const featured = await getFeaturedProducts();

  return (
    <section className="py-16 sm:py-24 bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-shadow-magic">
            Featured Collection
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Handpicked favorites, just for you. Fall in love with our most magical pieces.
          </p>
          <div className="mt-4 flex justify-center">
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className="animate-fadeIn"
              style={{ '--animation-delay': `${index * 100}ms` } as React.CSSProperties}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
