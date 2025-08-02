
'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { CartDrawer } from './cart-drawer';

export function CartWidget() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="group relative rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110" 
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground border-2 border-background">
            {cartCount}
          </span>
        )}
      </Button>
      <CartDrawer isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
