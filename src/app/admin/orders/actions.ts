'use server';

import { setOrderStatus } from '@/lib/orders';
import type { Order } from '@/lib/types';

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<{ success: boolean }> {
  // Here you would add authentication and authorization checks
  // to ensure the user is an admin.
  return await setOrderStatus(orderId, status);
}
