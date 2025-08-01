import { getOrders } from './orders';
import { getProducts } from './products';
import { getReviews } from './reviews';
import type { Order, Product, Review } from './types';

export interface DashboardStats {
  totalRevenue: number;
  totalSales: number;
  totalProducts: number;
  totalCustomers: number;
  averageRating: number;
  totalReviews: number;
  recentOrders: Order[];
  lowStockProducts: Product[];
  monthlyGrowth: {
    revenue: number;
    sales: number;
    customers: number;
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get all data concurrently
    const [orders, products, reviews] = await Promise.all([
      getOrders(),
      getProducts(),
      getReviews(),
    ]);

    // Calculate date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Filter orders by date
    const thisMonthOrders = orders.filter(order => 
      order.createdAt >= startOfMonth
    );
    const lastMonthOrders = orders.filter(order => 
      order.createdAt >= startOfLastMonth && order.createdAt <= endOfLastMonth
    );

    // Calculate totals
    const totalRevenue = orders
      .filter(order => order.paymentStatus === 'Paid')
      .reduce((sum, order) => sum + order.total, 0);

    const totalSales = orders.filter(order => 
      order.status === 'Delivered'
    ).length;

    // Get unique customers (by email)
    const uniqueCustomers = new Set(orders.map(order => order.customerEmail));
    const totalCustomers = uniqueCustomers.size;

    // Calculate average rating
    const approvedReviews = reviews.filter(review => review.status === 'Approved');
    const averageRating = approvedReviews.length > 0 
      ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length 
      : 0;

    // Get recent orders (last 10)
    const recentOrders = orders.slice(0, 10);

    // Find low stock products (less than 10 in stock)
    const lowStockProducts = products.filter(product => 
      product.stockQuantity && product.stockQuantity < 10
    );

    // Calculate monthly growth
    const thisMonthRevenue = thisMonthOrders
      .filter(order => order.paymentStatus === 'Paid')
      .reduce((sum, order) => sum + order.total, 0);
    
    const lastMonthRevenue = lastMonthOrders
      .filter(order => order.paymentStatus === 'Paid')
      .reduce((sum, order) => sum + order.total, 0);

    const thisMonthSales = thisMonthOrders.filter(order => 
      order.status === 'Delivered'
    ).length;
    
    const lastMonthSales = lastMonthOrders.filter(order => 
      order.status === 'Delivered'
    ).length;

    const thisMonthCustomers = new Set(thisMonthOrders.map(order => order.customerEmail)).size;
    const lastMonthCustomers = new Set(lastMonthOrders.map(order => order.customerEmail)).size;

    // Calculate growth percentages
    const revenueGrowth = lastMonthRevenue > 0 
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100) 
      : thisMonthRevenue > 0 ? 100 : 0;

    const salesGrowth = lastMonthSales > 0 
      ? ((thisMonthSales - lastMonthSales) / lastMonthSales * 100) 
      : thisMonthSales > 0 ? 100 : 0;

    const customersGrowth = lastMonthCustomers > 0 
      ? ((thisMonthCustomers - lastMonthCustomers) / lastMonthCustomers * 100) 
      : thisMonthCustomers > 0 ? 100 : 0;

    return {
      totalRevenue,
      totalSales,
      totalProducts: products.length,
      totalCustomers,
      averageRating,
      totalReviews: approvedReviews.length,
      recentOrders,
      lowStockProducts,
      monthlyGrowth: {
        revenue: revenueGrowth,
        sales: salesGrowth,
        customers: customersGrowth,
      },
    };
  } catch (error) {
    console.error('Error calculating dashboard stats:', error);
    
    // Return default stats if there's an error
    return {
      totalRevenue: 0,
      totalSales: 0,
      totalProducts: 0,
      totalCustomers: 0,
      averageRating: 0,
      totalReviews: 0,
      recentOrders: [],
      lowStockProducts: [],
      monthlyGrowth: {
        revenue: 0,
        sales: 0,
        customers: 0,
      },
    };
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatGrowth(growth: number): string {
  const sign = growth > 0 ? '+' : '';
  return `${sign}${growth.toFixed(1)}%`;
}
