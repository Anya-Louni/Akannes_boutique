import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { getProducts } from '@/lib/products';
import { ProductTable } from '@/components/admin/products/product-table';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    let products: any[] = [];
    let error: string | null = null;
    
    try {
        products = await getProducts();
    } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to fetch products';
        console.error('Error fetching products:', e);
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href="/admin/products/new">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Product
                        </Link>
                    </Button>
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Your Product Inventory</CardTitle>
                    <CardDescription>
                        Here is a list of all the products in your store. You can edit or delete them.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <div className="p-4 border border-red-200 rounded-md bg-red-50">
                            <p className="text-red-800">Error: {error}</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">No products found. Add your first product!</p>
                            <Button asChild>
                                <Link href="/admin/products/new">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add First Product
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <ProductTable products={products} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
