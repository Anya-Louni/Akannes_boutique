import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, ArrowRight } from 'lucide-react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

async function getCharmProduct(): Promise<Product | null> {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('isFeatured', '==', true), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        // As a fallback, get the most recently created product
        const allProductsQuery = query(collection(db, 'products'), limit(1));
        const allProductsSnapshot = await getDocs(allProductsQuery);
        if (allProductsSnapshot.empty) {
            return null;
        }
        const doc = allProductsSnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Product;
    }
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Product;
}


export async function MagicalCharm() {
  const product = await getCharmProduct();

  if (!product) {
    return (
        <section className="py-16 sm:py-24 bg-background/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <Skeleton className="aspect-square rounded-2xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-12 w-1/2" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-12 w-48" />
                    </div>
                 </div>
            </div>
        </section>
    )
  }

  return (
    <section className="py-16 sm:py-24 bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="animate-fadeIn">
                 <Link href={`/shop/${product.slug}`}>
                    <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 border-primary/10 bg-white/30 backdrop-blur-sm group">
                        <div className="aspect-square relative">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                data-ai-hint={`${product.category} clothing`}
                            />
                        </div>
                    </Card>
                </Link>
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
                 <div className="flex items-center gap-2 text-primary">
                    <Wand2 className="h-6 w-6" />
                    <h3 className="text-xl font-semibold">This Month's Magical Charm</h3>
                 </div>
                 <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-shadow-magic mt-2">
                    {product.name}
                 </h2>
                 <p className="mt-4 text-lg text-foreground/70 line-clamp-4">
                    {product.description}
                 </p>
                 <Button asChild size="lg" className="mt-8 rounded-full">
                    <Link href={`/shop/${product.slug}`}>
                        Discover the Magic <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                 </Button>
            </div>
        </div>
      </div>
    </section>
  );
}