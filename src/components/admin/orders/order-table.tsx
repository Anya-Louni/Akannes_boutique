'use client';

import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/lib/types';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface OrderTableProps {
  orders: Order[];
}

export function OrderTable({ orders }: OrderTableProps) {

  const getStatusVariant = (status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled') => {
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
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
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
              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{order.total.toLocaleString()} DZD</TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Delivered</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
