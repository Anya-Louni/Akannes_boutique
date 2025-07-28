import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col group overflow-hidden rounded-2xl shadow-lg hover:shadow-primary/20 transition-all duration-300 border-primary/10 bg-white/30 backdrop-blur-sm">
      <CardHeader className="p-0 relative">
        <Link href={`/shop/${product.slug}`} className="block">
          <div className="aspect-[3/4] overflow-hidden relative">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              data-ai-hint={`${product.category} clothing`}
            />
             <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
             <div 
                className="absolute bottom-0 w-full h-8"
                style={{
                    background: 'url(/chocolate-texture.png)',
                    backgroundSize: 'cover',
                    opacity: 0.5
                }}
             />
          </div>
        </Link>
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-3 right-3">Out of Stock</Badge>
        )}
         <Button variant="ghost" size="icon" className="absolute top-2 left-2 bg-background/50 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="h-5 w-5"/>
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <CardTitle className="font-headline text-xl leading-tight">
          <Link href={`/shop/${product.slug}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">{product.price.toLocaleString()} DZD</p>
        <Button disabled={!product.inStock} className="rounded-full">
            <ShoppingCart className="mr-2 h-4 w-4"/>
            Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
