import { revalidatePath } from 'next/cache';
import { collection, addDoc, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Order, OrderItem } from './types';
import { updateProductInventory, checkProductStock } from './products';

// Interface for creating new orders
export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: Order['status'];
  paymentStatus: Order['paymentStatus'];
  paymentMethod?: string;
  paymentDetails?: Record<string, string>;
}

// Get all orders
export async function getOrders(): Promise<Order[]> {
  try {
    const ordersCol = collection(db, 'orders');
    const orderSnapshot = await getDocs(ordersCol);
    const orderList = orderSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Order[];
    
    return orderList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

// Get order by ID
export async function getOrderById(id: string): Promise<Order | undefined> {
  try {
    const orderDoc = doc(db, 'orders', id);
    const orderSnap = await getDoc(orderDoc);
    
    if (orderSnap.exists()) {
      return {
        id: orderSnap.id,
        ...orderSnap.data(),
        createdAt: orderSnap.data().createdAt?.toDate() || new Date(),
      } as Order;
    }
    
    return undefined;
  } catch (error) {
    console.error('Error fetching order:', error);
    return undefined;
  }
}

// Add a new order
export async function addOrder(orderData: CreateOrderData): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    // Check stock for all items before processing
    for (const item of orderData.items) {
      const stockCheck = await checkProductStock(item.productId, item.quantity);
      if (!stockCheck.available) {
        return { 
          success: false, 
          error: `Insufficient stock for ${item.name}. Available: ${stockCheck.currentStock}, Requested: ${item.quantity}` 
        };
      }
    }
    
    // Create the order
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date(),
    });
    
    // Update inventory for each item
    for (const item of orderData.items) {
      const inventoryUpdate = await updateProductInventory(item.productId, item.quantity);
      if (!inventoryUpdate.success) {
        console.error(`Failed to update inventory for ${item.name}:`, inventoryUpdate.error);
      } else if (inventoryUpdate.outOfStock) {
        console.log(`🚨 NOTIFICATION: ${item.name} is now out of stock!`);
        // Here you could send actual notifications (email, SMS, etc.)
      }
    }
    
    revalidatePath('/admin/orders');
    revalidatePath('/admin/products');
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error('Error adding order:', error);
    return { success: false, error: 'Failed to create order' };
  }
}

// Update order status
export async function setOrderStatus(id: string, status: Order['status']): Promise<{ success: boolean }> {
  try {
    const orderRef = doc(db, 'orders', id);
    await updateDoc(orderRef, { status });
    
    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${id}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false };
  }
}
