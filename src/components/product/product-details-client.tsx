
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Heart, Ruler, ShoppingCart, Truck } from 'lucide-react';
import SizeChartModal from './size-chart-modal';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';


interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    // We pass the full product object and the selected size and quantity
    addItem(product, quantity, selectedSize);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} (${selectedSize}) has been added.`,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 animate-fadeIn">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg border border-primary/10">
          <Image
            src={selectedImage}
            alt={`${product.name} - ${selectedImage}`}
            fill
            className="object-cover transition-all duration-300"
            data-ai-hint={`${product.category} clothing product shot`}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
            >
              <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <Badge variant="secondary" className="w-fit mb-2">{product.category}</Badge>
        <h1 className="font-headline text-4xl lg:text-5xl font-bold text-primary text-shadow-magic">{product.name}</h1>
        <p className="mt-4 text-3xl font-bold text-foreground">{product.price.toLocaleString()} DZD</p>
        <Separator className="my-6" />
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        <Separator className="my-6" />

        {/* Size Selection */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-xl font-headline">Select Size</Label>
            <SizeChartModal />
          </div>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <div key={size}>
                <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                <Label
                  htmlFor={`size-${size}`}
                  className="px-4 py-2 border rounded-full cursor-pointer transition-colors peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary hover:bg-secondary"
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="mt-8 flex gap-4">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            min="1"
            className="w-20 text-center"
          />
          <Button size="lg" className="flex-grow rounded-full" disabled={!product.inStock} onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <Button size="lg" variant="outline" className="rounded-full aspect-square p-0">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-primary/10 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 text-primary"/>
                <span>Ships within Algeria. Cash on delivery available!</span>
            </div>
        </div>

      </div>
    </div>
  );
}
