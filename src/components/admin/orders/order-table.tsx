'use client';

import * as React from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/lib/types';
import { MoreHorizontal, Eye, Truck, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { updateOrderStatus } from '@/app/admin/orders/actions';

interface OrderTableProps {
  orders: Order[];
}

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
          <TableRow key={order.id}>
            <TableCell className="font-medium">#{order.id.slice(0, 6)}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
            </TableCell>
             <TableCell>
              <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>{order.paymentStatus}</Badge>
            </TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{order.total.toLocaleString()} DZD</TableCell>
            <TableCell className="text-right">
              {isUpdating === order.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/orders/${order.id}`}><Eye />View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Shipped')} disabled={order.status === 'Shipped' || order.status === 'Delivered'}><Truck />Mark as Shipped</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Delivered')} disabled={order.status === 'Delivered'}><CheckCircle />Mark as Delivered</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Cancelled')} className="text-destructive focus:text-destructive" disabled={order.status === 'Cancelled' || order.status === 'Delivered'}><XCircle />Cancel Order</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
