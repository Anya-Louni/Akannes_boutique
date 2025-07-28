'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';

const categories = ['Gothic Lolita', 'Sweet Lolita', 'Gyaru', 'Shoujo'];
const sizes = ['S', 'M', 'L', 'XL', 'One Size'];

interface ShopClientProps {
  products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [size, setSize] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(true);

  const applyFilters = () => {
    let tempProducts = [...products];

    if (inStockOnly) {
      tempProducts = tempProducts.filter(p => p.inStock);
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter(p => p.category === category);
    }
    if (size !== 'all') {
      tempProducts = tempProducts.filter(p => p.sizes.includes(size));
    }
    tempProducts = tempProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(tempProducts);
  };
  
  const resetFilters = () => {
    setCategory('all');
    setPriceRange([0, 20000]);
    setSize('all');
    setInStockOnly(true);
    setFilteredProducts(products.filter(p => p.inStock));
  };
  
  useMemo(applyFilters, [category, priceRange, size, inStockOnly, products]);

  const FiltersComponent = () => (
    <div className="space-y-6">
        <div>
          <h3 className="font-headline text-xl mb-4">Category</h3>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className="font-headline text-xl mb-4">Price Range</h3>
          <Slider
            min={0}
            max={20000}
            step={500}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{priceRange[0]} DZD</span>
            <span>{priceRange[1]} DZD</span>
          </div>
        </div>
        <div>
          <h3 className="font-headline text-xl mb-4">Size</h3>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              {sizes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="in-stock" className="font-headline text-xl">In Stock Only</Label>
          <Switch id="in-stock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
        </div>
        <Button onClick={resetFilters} variant="outline" className="w-full">Reset Filters</Button>
      </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="hidden lg:block lg:w-1/4 xl:w-1/5">
        <div className="sticky top-24 p-6 rounded-2xl bg-white/30 backdrop-blur-sm border border-primary/10 shadow-lg">
          <h2 className="font-headline text-2xl mb-4">Filters</h2>
          <FiltersComponent />
        </div>
      </aside>
      
      <main className="lg:w-3/4 xl:w-4/5">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">{filteredProducts.length} products found</p>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
              </SheetTrigger>
              <SheetContent>
                <div className="p-2 pt-8">
                  <h2 className="font-headline text-2xl mb-4">Filters</h2>
                  <FiltersComponent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-headline text-2xl text-primary">No magical items found!</p>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to find your dream outfit.</p>
            <Button onClick={resetFilters} className="mt-4">Clear Filters</Button>
          </div>
        )}
      </main>
    </div>
  );
}
