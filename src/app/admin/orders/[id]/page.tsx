import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/orders';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, MapPin, Calendar, Hash, CreditCard, Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface OrderDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
    const order = await getOrderById(params.id);

    if (!order) {
        notFound();
    }
    
    const getStatusVariant = (status: any) => {
        switch (status) {
          case 'Delivered': return 'default';
          case 'Shipped': return 'secondary';
          case 'Pending': return 'outline';
          case 'Cancelled': return 'destructive';
          default: return 'default';
        }
    };

    const getPaymentStatusVariant = (status: any) => {
      switch(status) {
          case 'Paid': return 'default';
          case 'Pending': return 'outline';
          case 'Refunded': return 'destructive';
          default: return 'default';
      }
  }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
             <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/orders">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Orders</span>
                    </Link>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Order Details</h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Subtotal</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {order.items.map((item, index) => (
                                    <TableRow key={index}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className="text-right">{item.price.toLocaleString()} DZD</TableCell>
                                    <TableCell className="text-right">{(item.quantity * item.price).toLocaleString()} DZD</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                             <Package className="h-6 w-6 text-primary" />
                             <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>{order.total.toLocaleString()} DZD</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>Free</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{order.total.toLocaleString()} DZD</span>
                            </div>
                            <Separator />
                             <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Status:</span>
                                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                            </div>
                             <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Payment:</span>
                                <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>{order.paymentStatus}</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Details</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-4 text-sm">
                            <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> <span>{order.customerName}</span></div>
                            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> <span>{order.customerEmail}</span></div>
                            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> <span>{order.customerAddress}</span></div>
                            <Separator />
                            <div className="flex items-center gap-2"><Hash className="h-4 w-4 text-muted-foreground" /> <span>{order.id}</span></div>
                            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> <span>{new Date(order.createdAt).toLocaleString()}</span></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
