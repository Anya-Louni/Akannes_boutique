
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/lib/types';
import { MoreHorizontal, Eye, Truck, CheckCircle, XCircle, Loader2, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { updateOrderStatus } from '@/app/admin/orders/actions';
import { cn } from '@/lib/utils';

interface OrderTableProps {
  orders: Order[];
}

const statusOptions: Order['status'][] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

export function OrderTable({ orders }: OrderTableProps) {
  const [isUpdating, setIsUpdating] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    setIsUpdating(orderId);
    const result = await updateOrderStatus(orderId, status);
    if (result.success) {
      toast({
        title: 'Success!',
        description: `Order #${orderId.slice(0,6)} has been marked as ${status}.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Oh no!',
        description: 'Failed to update order status.',
      });
    }
    setIsUpdating(null);
  };

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'default';
      case 'Shipped':
        return 'secondary';
      case 'Pending':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getPaymentStatusVariant = (status: Order['paymentStatus']) => {
      switch(status) {
          case 'Paid': return 'default';
          case 'Pending': return 'outline';
          case 'Refunded': return 'destructive';
          default: return 'default';
      }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className={cn(isUpdating === order.id && "opacity-50")}>
            <TableCell className="font-medium">#{order.id.slice(0, 6)}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 p-1 h-auto disabled:opacity-100" disabled={isUpdating === order.id}>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    {isUpdating === order.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ): (
                      <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Change status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {statusOptions.map(status => (
                    <DropdownMenuItem 
                      key={status} 
                      onClick={() => handleStatusChange(order.id, status)}
                      disabled={order.status === status}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
             <TableCell>
              <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>{order.paymentStatus}</Badge>
            </TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{order.total.toLocaleString()} DZD</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0" disabled={isUpdating === order.id}>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/orders/${order.id}`} className="flex items-center gap-2"><Eye />View Details</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
