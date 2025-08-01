'use client';

import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { ProductTableActions } from './product-table-actions';
import { cn } from '@/lib/utils';

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const outOfStockCount = products.filter(p => !p.inStock || (p.stockQuantity && p.stockQuantity === 0)).length;
  const lowStockCount = products.filter(p => p.inStock && p.stockQuantity && p.stockQuantity > 0 && p.stockQuantity <= 3).length;

  return (
    <div className="space-y-4">
      {/* Simple status summary */}
      {(outOfStockCount > 0 || lowStockCount > 0) && (
        <div className="text-sm text-muted-foreground">
          {outOfStockCount > 0 && (
            <span className="text-red-600">
              {outOfStockCount} product{outOfStockCount > 1 ? 's' : ''} out of stock
            </span>
          )}
          {outOfStockCount > 0 && lowStockCount > 0 && <span> • </span>}
          {lowStockCount > 0 && (
            <span className="text-orange-600">
              {lowStockCount} product{lowStockCount > 1 ? 's' : ''} running low
            </span>
          )}
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const stockQuantity = product.stockQuantity || 0;
            const isLowStock = stockQuantity > 0 && stockQuantity <= 3;
            const isOutOfStock = stockQuantity === 0 || !product.inStock;

            return (
              <TableRow 
                key={product.id}
                className={cn(
                  isOutOfStock && "bg-red-50/50",
                  isLowStock && "bg-orange-50/50"
                )}
              >
                <TableCell className="hidden sm:table-cell">
                  <div className="relative">
                    <Image
                      alt={product.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.images[0] || 'https://placehold.co/64x64.png'}
                      width="64"
                      data-ai-hint={`${product.category} clothing`}
                    />
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant={product.inStock ? 'default' : 'destructive'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-medium",
                      isOutOfStock && "text-red-600",
                      isLowStock && "text-orange-600"
                    )}>
                      {stockQuantity}
                    </span>
                    {isLowStock && !isOutOfStock && (
                      <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
                        Low
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{product.price.toLocaleString()} DZD</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <ProductTableActions productId={product.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
