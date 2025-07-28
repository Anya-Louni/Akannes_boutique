import { revalidatePath } from 'next/cache';
import type { Order } from './types';

// Mock data for orders, since we don't have a checkout process yet.
// In a real app, this would be a Firestore collection.
let MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1fH8sA2eZvKYlo2ChQ4p6x7y',
    customerName: 'Yasmine B.',
    customerEmail: 'yasmine@example.com',
    customerAddress: '123 Rue de la Fantaisie, Algiers, 16000',
    items: [
      { productId: 'prod_1', name: 'Gothic Lolita Skirt', quantity: 1, price: 7500 },
      { productId: 'prod_2', name: 'Lace Trimmed Blouse', quantity: 1, price: 4500 },
    ],
    total: 12000,
    status: 'Shipped',
    paymentStatus: 'Paid',
    createdAt: new Date('2024-05-20T10:30:00Z'),
  },
  {
    id: 'ord_1fG7vB3fGhLJop3DkR5q7z8w',
    customerName: 'Amina L.',
    customerEmail: 'amina@example.com',
    customerAddress: '456 Avenue des Rêves, Oran, 31000',
    items: [{ productId: 'prod_3', name: 'Sweet Lolita JSK', quantity: 1, price: 11000 }],
    total: 11000,
    status: 'Delivered',
    paymentStatus: 'Paid',
    createdAt: new Date('2024-05-18T14:00:00Z'),
  },
  {
    id: 'ord_1fE6uC4gHkKJlo4EwT6r8y9v',
    customerName: 'Sarah K.',
    customerEmail: 'sarah@example.com',
    customerAddress: '789 Boulevard de la Magie, Constantine, 25000',
    items: [{ productId: 'prod_4', name: 'Pastel Pink Cardigan', quantity: 2, price: 3500 }],
    total: 7000,
    status: 'Pending',
    paymentStatus: 'Pending',
    createdAt: new Date('2024-05-22T09:15:00Z'),
  },
   {
    id: 'ord_1fD5tD5hJjLKop5FvU7s9z0u',
    customerName: 'Fatima Z.',
    customerEmail: 'fatima@example.com',
    customerAddress: '101 Chemin des Étoiles, Annaba, 23000',
    items: [
        { productId: 'prod_5', name: 'Gyaru Denim Mini-skirt', quantity: 1, price: 6000 },
        { productId: 'prod_6', name: 'Platform Boots', quantity: 1, price: 9500 }
    ],
    total: 15500,
    status: 'Delivered',
    paymentStatus: 'Paid',
    createdAt: new Date('2024-05-15T11:45:00Z'),
  },
  {
    id: 'ord_1fC4sC6gIiKLlo6GwS8t0y1t',
    customerName: 'Nour H.',
    customerEmail: 'nour@example.com',
    customerAddress: '212 Allée des Contes de Fées, Sétif, 19000',
    items: [{ productId: 'prod_7', name: 'Rose Headdress', quantity: 1, price: 2500 }],
    total: 2500,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    createdAt: new Date('2024-05-19T18:00:00Z'),
  },
];

// In a real app, this would fetch from Firestore. For now, it returns mock data.
export async function getOrders(): Promise<Order[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_ORDERS.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_ORDERS.find(order => order.id === id);
}

// This would update Firestore in a real app
export async function setOrderStatus(id: string, status: Order['status']): Promise<{ success: boolean }> {
    const orderIndex = MOCK_ORDERS.findIndex(order => order.id === id);
    if (orderIndex === -1) {
        return { success: false };
    }
    
    MOCK_ORDERS[orderIndex].status = status;
    
    // If an order is cancelled, we might mark payment as refunded.
    if (status === 'Cancelled') {
         MOCK_ORDERS[orderIndex].paymentStatus = 'Refunded';
    }
     // If an order is delivered, we might mark payment as paid.
    if (status === 'Delivered') {
         MOCK_ORDERS[orderIndex].paymentStatus = 'Paid';
    }


    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${id}`);

    return { success: true };
}
