import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, ShoppingBag, Star, Package, Tag } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,523,189 DZD</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              Based on 245 reviews
            </p>
          </CardContent>
        </Card>
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have 5 new orders this week.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recent orders list */}
            <p className="text-sm text-muted-foreground">Recent orders will be displayed here.</p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
              <Link href="/admin/products/new" className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                  <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-center">Add Product</span>
              </Link>
               <Link href="/admin/categories" className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                  <Tag className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-center">Manage Categories</span>
              </Link>
               <Link href="/admin/orders" className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                  <Package className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-center">View Orders</span>
              </Link>
               <Link href="/admin/reviews" className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                  <Star className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-center">Check Reviews</span>
              </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
