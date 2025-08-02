'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { WishlistItem, Product } from '@/lib/types';
import { getUserWishlist, removeFromWishlist } from '@/lib/wishlist';
import { getProductById } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function WishlistPage() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<(WishlistItem & { product: Product })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      loadWishlist();
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [user, isLoaded]);

  const loadWishlist = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const wishlist = await getUserWishlist(user.id);
      
      // Get product details for each wishlist item
      const wishlistWithProducts = await Promise.all(
        wishlist.map(async (item) => {
          const product = await getProductById(item.productId);
          return { ...item, product };
        })
      );
      
      // Filter out items where product couldn't be found and cast to correct type
      setWishlistItems(
        wishlistWithProducts.filter((item): item is WishlistItem & { product: Product } => 
          item.product !== null
        )
      );
    } catch (error) {
      console.error('Error loading wishlist:', error);
      toast({
        title: 'Error',
        description: 'Failed to load wishlist items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!user) return;
    
    try {
      await removeFromWishlist(user.id, productId);
      setWishlistItems(prev => prev.filter(item => item.productId !== productId));
      toast({
        title: 'Success',
        description: 'Item removed from wishlist',
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove item from wishlist',
        variant: 'destructive',
      });
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-headline text-primary mb-4">Sign in to view your wishlist</h1>
          <p className="text-muted-foreground mb-8">Create an account to save your favorite items</p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-headline text-primary mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">Start adding items you love to your wishlist</p>
          <Button asChild>
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-headline text-primary mb-8">
          My Wishlist ({wishlistItems.length} items)
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="glass-surface border-primary/20 group hover:scale-105 transition-transform duration-300">
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={item.product.images[0] || '/placeholder-product.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveFromWishlist(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                  {item.product.name}
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">
                  ${item.product.price}
                </p>
                
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link href={`/shop/${item.product.slug}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="px-3">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
