'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Loader2, CheckCircle, AlertCircle, ExternalLink, Info } from 'lucide-react';
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
      // Note: This is currently using mock data
      // For real Instagram integration, you would need Instagram Basic Display API
      const products = instagramProducts;
      let success = 0;
      let failed = 0;

      for (const product of products) {
        try {
          const productData = {
            ...product,
            isFeatured: product.isFeatured ?? false,
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
    <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="h-5 w-5 text-pink-500" />
          Instagram Integration
        </CardTitle>
        <CardDescription>
          Sync products from @akannesboutique Instagram page
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Information */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800">Instagram API Integration</h4>
              <p className="text-sm text-blue-700">
                To connect with your real Instagram account, you'll need to set up the Instagram Basic Display API:
              </p>
              <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                <li>Create a Facebook Developer account</li>
                <li>Set up Instagram Basic Display API</li>
                <li>Get your Access Token and App ID</li>
                <li>Configure webhook for automatic sync</li>
              </ul>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://developers.facebook.com/docs/instagram-basic-display-api" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    API Docs
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Developer Console
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Currently using {instagramProducts.length} demo products (mock data):
            </p>
            <Badge variant="secondary">Demo Mode</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {instagramProducts.slice(0, 4).map((product, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.price.toLocaleString()} DZD</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>
            ))}
            {instagramProducts.length > 4 && (
              <div className="flex items-center justify-center p-3 border-2 border-dashed border-gray-200 rounded-lg">
                <span className="text-sm text-muted-foreground">
                  +{instagramProducts.length - 4} more demo products
                </span>
              </div>
            )}
          </div>
        </div>

        {syncResults && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <h4 className="font-semibold flex items-center gap-2 text-green-800">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Sync Results
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm mt-3">
              <div className="text-center">
                <div className="font-bold text-green-600 text-lg">{syncResults.success}</div>
                <div className="text-green-700">Success</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-red-600 text-lg">{syncResults.failed}</div>
                <div className="text-red-700">Failed</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600 text-lg">{syncResults.total}</div>
                <div className="text-blue-700">Total</div>
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={syncInstagramProducts}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Syncing demo products...
            </>
          ) : (
            <>
              <Instagram className="mr-2 h-4 w-4" />
              Sync Demo Products
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground bg-yellow-50 border border-yellow-200 rounded p-3">
          <AlertCircle className="h-3 w-3 inline mr-1 text-yellow-600" />
          <strong>Current Status:</strong> Using demo data. To sync from your real Instagram account, 
          you'll need to implement the Instagram Basic Display API with proper authentication and permissions.
        </div>
      </CardContent>
    </Card>
  );
}
