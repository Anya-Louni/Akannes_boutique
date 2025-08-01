
'use client';

import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function CartDrawer({ isOpen, onOpenChange }: CartDrawerProps) {
  const { cartItems, removeItem, updateQuantity, totalPrice, cartCount } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-headline text-3xl text-primary flex items-center gap-2">
            <ShoppingBag className="h-8 w-8" />
            My Magical Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6 space-y-4">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden shrink-0">
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                           <div className="flex justify-between">
                                <h4 className="font-semibold">{item.name}</h4>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id, item.selectedSize)}>
                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                           </div>
                           {item.selectedSize && <p className="text-sm text-muted-foreground">Size: {item.selectedSize}</p>}
                           <p className="text-sm font-bold text-primary">{item.price.toLocaleString()} DZD</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value), item.selectedSize)}
                                min="1"
                                className="w-16 h-8"
                            />
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Subtotal</span>
                  <span>{totalPrice.toLocaleString()} DZD</span>
                </div>
                <Button size="lg" className="w-full rounded-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Heart className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-headline text-2xl text-primary">Your Cart is Empty</h3>
            <p className="text-muted-foreground mt-2">Find something magical to fill it!</p>
            <Button asChild className="mt-6 rounded-full" onClick={() => onOpenChange(false)}>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
