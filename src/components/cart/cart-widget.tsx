
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
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
        <ShoppingCart className="h-6 w-6 text-foreground/80" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {cartCount}
          </span>
        )}
      </Button>
      <CartDrawer isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
