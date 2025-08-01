"use client";

import { useState, useEffect } from 'react';
import { Bell, X, Package, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getProducts } from '@/lib/products';
import type { Product } from '@/lib/types';

export default function StockAlerts() {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkStock() {
      try {
        const products = await getProducts();
        
        const lowStock = products.filter(p => 
          p.stockQuantity > 0 && p.stockQuantity <= 3 && p.inStock
        );
        
        const outOfStock = products.filter(p => 
          p.stockQuantity === 0 || !p.inStock
        );
        
        setLowStockProducts(lowStock);
        setOutOfStockProducts(outOfStock);
      } catch (error) {
        console.error('Error checking stock:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkStock();
    
    // Check every 30 seconds
    const interval = setInterval(checkStock, 30000);
    return () => clearInterval(interval);
  }, []);

  const totalAlerts = lowStockProducts.length + outOfStockProducts.length;

  if (isLoading) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Alert Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className={cn(
          "relative rounded-full border-primary/30 bg-white/95 backdrop-blur-sm",
          "hover:bg-primary/10 transition-all duration-200",
          totalAlerts > 0 && "border-orange-300 text-orange-600"
        )}
      >
        <Bell className="h-4 w-4" />
        {totalAlerts > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full"
          >
            {totalAlerts}
          </Badge>
        )}
      </Button>

      {/* Alerts Panel */}
      {isOpen && (
        <Card className="absolute top-12 right-0 w-80 max-h-96 overflow-y-auto bg-white/95 backdrop-blur-sm border-primary/20 shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Stock Alerts</CardTitle>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Monitor your inventory levels
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {totalAlerts === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">All products are well stocked!</p>
              </div>
            ) : (
              <>
                {/* Out of Stock Alerts */}
                {outOfStockProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200"
                  >
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-red-800 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-red-600">Out of stock</p>
                    </div>
                  </div>
                ))}

                {/* Low Stock Alerts */}
                {lowStockProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-orange-200"
                  >
                    <Package className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-orange-800 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-orange-600">
                        Only {product.stockQuantity} left
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
