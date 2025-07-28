import type { Order } from './types';

// Mock data for orders, since we don't have a checkout process yet.
const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1fH8sA2eZvKYlo2ChQ4p6x7y',
    customerName: 'Yasmine B.',
    customerEmail: 'yasmine@example.com',
    items: [
      { productId: 'prod_1', name: 'Gothic Lolita Skirt', quantity: 1, price: 7500 },
      { productId: 'prod_2', name: 'Lace Trimmed Blouse', quantity: 1, price: 4500 },
    ],
    total: 12000,
    status: 'Shipped',
    createdAt: new Date('2024-05-20T10:30:00Z'),
  },
  {
    id: 'ord_1fG7vB3fGhLJop3DkR5q7z8w',
    customerName: 'Amina L.',
    customerEmail: 'amina@example.com',
    items: [{ productId: 'prod_3', name: 'Sweet Lolita JSK', quantity: 1, price: 11000 }],
    total: 11000,
    status: 'Delivered',
    createdAt: new Date('2024-05-18T14:00:00Z'),
  },
  {
    id: 'ord_1fE6uC4gHkKJlo4EwT6r8y9v',
    customerName: 'Sarah K.',
    customerEmail: 'sarah@example.com',
    items: [{ productId: 'prod_4', name: 'Pastel Pink Cardigan', quantity: 2, price: 3500 }],
    total: 7000,
    status: 'Pending',
    createdAt: new Date('2024-05-22T09:15:00Z'),
  },
   {
    id: 'ord_1fD5tD5hJjLKop5FvU7s9z0u',
    customerName: 'Fatima Z.',
    customerEmail: 'fatima@example.com',
    items: [
        { productId: 'prod_5', name: 'Gyaru Denim Mini-skirt', quantity: 1, price: 6000 },
        { productId: 'prod_6', name: 'Platform Boots', quantity: 1, price: 9500 }
    ],
    total: 15500,
    status: 'Delivered',
    createdAt: new Date('2024-05-15T11:45:00Z'),
  },
  {
    id: 'ord_1fC4sC6gIiKLlo6GwS8t0y1t',
    customerName: 'Nour H.',
    customerEmail: 'nour@example.com',
    items: [{ productId: 'prod_7', name: 'Rose Headdress', quantity: 1, price: 2500 }],
    total: 2500,
    status: 'Cancelled',
    createdAt: new Date('2024-05-19T18:00:00Z'),
  },
];

// In a real app, this would fetch from Firestore. For now, it returns mock data.
export async function getOrders(): Promise<Order[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_ORDERS;
}
