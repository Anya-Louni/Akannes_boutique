import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { getProducts } from '@/lib/products';
import { ProductTable } from '@/components/admin/products/product-table';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await getProducts();

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
                   <ProductTable products={products} />
                </CardContent>
            </Card>
        </div>
    );
}
