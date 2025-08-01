import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, ShoppingBag, Star, Package, Tag } from 'lucide-react';
import Link from 'next/link';
import InstagramSyncComponent from '@/components/admin/instagram-sync';

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6 bg-gradient-to-br from-pink-50 via-accent to-yellow-50 relative">
      {/* Chocolate box pattern overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-pattern opacity-15" />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-primary bg-accent/40 rounded-xl px-6 py-3 shadow-sm border border-accent-dark">Dashboard</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Chocolate box style cards */}
        <Card className="rounded-2xl bg-[hsl(var(--accent-dark))] shadow-lg border-4 border-[hsl(var(--accent))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold text-white">Total Revenue</CardTitle>
            <DollarSign className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4,523,189 DZD</div>
            <p className="text-xs text-accent">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl bg-[hsl(var(--accent-dark))] shadow-lg border-4 border-[hsl(var(--accent))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold text-white">Sales</CardTitle>
            <ShoppingBag className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+12,234</div>
            <p className="text-xs text-accent">+19% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl bg-[hsl(var(--accent-dark))] shadow-lg border-4 border-[hsl(var(--accent))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold text-white">Customers</CardTitle>
            <Users className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+2350</div>
            <p className="text-xs text-accent">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl bg-[hsl(var(--accent-dark))] shadow-lg border-4 border-[hsl(var(--accent))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold text-white">Average Rating</CardTitle>
            <Star className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4.8</div>
            <p className="text-xs text-accent">Based on 245 reviews</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4 rounded-2xl bg-[hsl(var(--accent))] shadow-lg border-4 border-[hsl(var(--accent-dark))]">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-primary">Recent Orders</CardTitle>
            <CardDescription className="text-primary">You have 5 new orders this week.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recent orders list */}
            <p className="text-sm text-primary">Recent orders will be displayed here.</p>
          </CardContent>
        </Card>
        <Card className="col-span-3 rounded-2xl bg-[hsl(var(--accent))] shadow-lg border-4 border-[hsl(var(--accent-dark))]">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
              <Link href="/admin/products/new" className="flex flex-col items-center justify-center p-4 bg-white rounded-xl hover:bg-pink-50 transition-colors border border-accent-dark shadow">
                  <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-center text-primary">Add Product</span>
              </Link>
               <Link href="/admin/categories" className="flex flex-col items-center justify-center p-4 bg-white rounded-xl hover:bg-pink-50 transition-colors border border-accent-dark shadow">
                  <Tag className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-center text-primary">Manage Categories</span>
              </Link>
               <Link href="/admin/orders" className="flex flex-col items-center justify-center p-4 bg-white rounded-xl hover:bg-pink-50 transition-colors border border-accent-dark shadow">
                  <Package className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-center text-primary">View Orders</span>
              </Link>
               <Link href="/admin/reviews" className="flex flex-col items-center justify-center p-4 bg-white rounded-xl hover:bg-pink-50 transition-colors border border-accent-dark shadow">
                  <Star className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-center text-primary">Check Reviews</span>
              </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Instagram Sync Section */}
      <div className="mt-8">
        <InstagramSyncComponent />
      </div>
    </div>
  );
}
