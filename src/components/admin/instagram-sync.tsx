'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { addProduct } from '@/lib/products';
import { instagramProducts } from '@/lib/instagram';
import { useToast } from '@/hooks/use-toast';

export default function InstagramSyncComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [syncResults, setSyncResults] = useState<{
    success: number;
    failed: number;
    total: number;
  } | null>(null);

  const { toast } = useToast();

  const syncInstagramProducts = async () => {
    setIsLoading(true);
    setSyncResults(null);

    try {
      const products = instagramProducts;
      let success = 0;
      let failed = 0;

      for (const product of products) {
        try {
          const productData = {
            ...product,
            isFeatured: product.isFeatured ?? false, // Ensure boolean value
          };
          const result = await addProduct(productData);
          if (result.success) {
            success++;
          } else {
            failed++;
            console.error(`Failed to add product ${product.name}:`, result.error);
          }
        } catch (error) {
          failed++;
          console.error(`Error adding product ${product.name}:`, error);
        }
      }

      setSyncResults({
        success,
        failed,
        total: products.length,
      });

      if (success > 0) {
        toast({
          title: 'Sync successful! ✨',
          description: `${success} products added successfully.`,
        });
      }

      if (failed > 0) {
        toast({
          variant: 'destructive',
          title: 'Sync errors',
          description: `${failed} products could not be added.`,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Sync error',
        description: 'An error occurred during synchronization.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="h-5 w-5 text-pink-500" />
          Instagram Sync
        </CardTitle>
        <CardDescription>
          Sync products from @akannesboutique
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will add {instagramProducts.length} products inspired by Akanne's Boutique Instagram posts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {instagramProducts.slice(0, 4).map((product, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.price.toLocaleString()} DZD</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
              </div>
            ))}
            {instagramProducts.length > 4 && (
              <div className="flex items-center justify-center p-2 border rounded-lg border-dashed">
                <span className="text-sm text-muted-foreground">
                  +{instagramProducts.length - 4} more products
                </span>
              </div>
            )}
          </div>
        </div>

        {syncResults && (
          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Sync Results
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-green-600">{syncResults.success}</div>
                <div className="text-muted-foreground">Success</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-red-600">{syncResults.failed}</div>
                <div className="text-muted-foreground">Failed</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600">{syncResults.total}</div>
                <div className="text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={syncInstagramProducts}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Syncing products...
            </>
          ) : (
            <>
              <Instagram className="mr-2 h-4 w-4" />
              Sync Instagram Products
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground">
          <AlertCircle className="h-3 w-3 inline mr-1" />
          Note: This function uses pre-configured product data inspired by @akannesboutique Instagram account.
        </div>
      </CardContent>
    </Card>
  );
}
