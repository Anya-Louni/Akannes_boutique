import { products } from '@/lib/products';
import ShopClient from '@/components/shop/shop-client';
import { Sparkles } from 'lucide-react';

export default function ShopPage() {
  // In a real app, you'd fetch this data.
  const allProducts = products;

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
      <ShopClient products={allProducts} />
    </div>
  );
}
