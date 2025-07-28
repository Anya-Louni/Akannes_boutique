import { getOrders } from '@/lib/orders';
import { OrderTable } from '@/components/admin/orders/order-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export default async function OrdersPage() {
    const orders = await getOrders();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            </div>
             <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Package className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Customer Orders</CardTitle>
                        <CardDescription>
                            View and manage all the orders from your store.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                   <OrderTable orders={orders} />
                </CardContent>
            </Card>
        </div>
    );
}
