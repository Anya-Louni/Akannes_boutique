import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, ShoppingBag, Star, Package, Tag, TrendingUp, Heart, AlertTriangle, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import InstagramSyncComponent from '@/components/admin/instagram-sync';
import { getDashboardStats, formatCurrency, formatGrowth } from '@/lib/dashboard';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 min-h-screen bg-gradient-to-br from-pink-50/50 via-rose-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Beautiful background patterns with soft pinks */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/10 via-rose-100/15 to-purple-100/10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/8 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-headline font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              ✨ Akanne's Dashboard
            </h1>
            <p className="text-pink-600/70 mt-2 font-body">Welcome back! Here's what's happening with your magical boutique.</p>
          </div>
        </div>

        {/* Bento Box Style Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-pink-100/80 to-rose-100/60 border border-pink-200/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-pink-700 font-body">Total Revenue</CardTitle>
              <div className="p-2 bg-pink-200/40 rounded-lg">
                <DollarSign className="h-4 w-4 text-pink-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-800 mb-1 font-headline">{formatCurrency(stats.totalRevenue)}</div>
              <div className="flex items-center text-xs text-pink-600 font-body">
                {stats.monthlyGrowth.revenue >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {formatGrowth(stats.monthlyGrowth.revenue)} from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-100/80 to-pink-100/60 border border-rose-200/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-rose-700 font-body">Sales</CardTitle>
              <div className="p-2 bg-rose-200/40 rounded-lg">
                <ShoppingBag className="h-4 w-4 text-rose-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-800 mb-1 font-headline">{stats.totalSales.toLocaleString()}</div>
              <div className="flex items-center text-xs text-rose-600 font-body">
                {stats.monthlyGrowth.sales >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {formatGrowth(stats.monthlyGrowth.sales)} from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-100/80 to-rose-100/60 border border-pink-200/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-pink-700 font-body">Customers</CardTitle>
              <div className="p-2 bg-pink-200/40 rounded-lg">
                <Users className="h-4 w-4 text-pink-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-800 mb-1 font-headline">{stats.totalCustomers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-pink-600 font-body">
                {stats.monthlyGrowth.customers >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {formatGrowth(stats.monthlyGrowth.customers)} from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-100/80 to-pink-100/60 border border-rose-200/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-rose-700 font-body">Average Rating</CardTitle>
              <div className="p-2 bg-rose-200/40 rounded-lg">
                <Star className="h-4 w-4 text-rose-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-800 mb-1 font-headline">
                {stats.averageRating > 0 ? `${stats.averageRating.toFixed(1)} ⭐` : 'No ratings'}
              </div>
              <div className="flex items-center text-xs text-rose-600 font-body">
                <Heart className="h-3 w-3 mr-1" />
                Based on {stats.totalReviews} reviews
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {stats.lowStockProducts.length > 0 && (
          <Card className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 mb-3">
                {stats.lowStockProducts.length} product(s) running low on inventory:
              </p>
              <div className="space-y-2">
                {stats.lowStockProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex justify-between items-center p-2 bg-white rounded-lg border border-red-200">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-red-600 font-semibold">{product.stockQuantity} left</span>
                  </div>
                ))}
              </div>
              {stats.lowStockProducts.length > 3 && (
                <Link href="/admin/products" className="text-red-600 hover:text-red-800 font-medium text-sm mt-2 block">
                  View all {stats.lowStockProducts.length} products →
                </Link>
              )}
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
          <Card className="col-span-4 bg-white/90 backdrop-blur-sm border border-pink-200/40 shadow-lg shadow-pink-500/5 rounded-2xl">
            <CardHeader className="border-b border-pink-100/50">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-pink-500" />
                Recent Orders
              </CardTitle>
              <CardDescription className="text-gray-600">
                {stats.recentOrders.length > 0 
                  ? `You have ${stats.recentOrders.length} recent orders.`
                  : 'No orders yet.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {stats.recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50/80 to-rose-50/60 rounded-lg border border-pink-100/50 hover:border-pink-200/60 transition-all">
                      <div>
                        <p className="font-medium text-gray-800">Order #{order.id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                        <p className="text-xs text-gray-500 capitalize">{order.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-pink-700">{formatCurrency(order.total)}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No orders yet. Start promoting your store!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-3 bg-white/90 backdrop-blur-sm border border-pink-200/40 shadow-lg shadow-pink-500/5 rounded-2xl">
            <CardHeader className="border-b border-pink-100/50">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Star className="h-5 w-5 text-pink-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pt-6">
              <Link href="/admin/products/new" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-200/60 to-rose-200/40 rounded-xl hover:from-pink-300/70 hover:to-rose-300/50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-pink-200/30">
                  <ShoppingBag className="h-8 w-8 mb-3 text-pink-700 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center text-pink-800">Add Product</span>
                </div>
              </Link>
              
              <Link href="/admin/categories" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-200/60 to-pink-200/40 rounded-xl hover:from-purple-300/70 hover:to-pink-300/50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-purple-200/30">
                  <Tag className="h-8 w-8 mb-3 text-purple-700 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center text-purple-800">Categories</span>
                </div>
              </Link>
              
              <Link href="/admin/orders" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-200/60 to-pink-200/40 rounded-xl hover:from-rose-300/70 hover:to-pink-300/50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-rose-200/30">
                  <Package className="h-8 w-8 mb-3 text-rose-700 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center text-rose-800">View Orders</span>
                </div>
              </Link>
              
              <Link href="/admin/reviews" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-200/60 to-yellow-200/40 rounded-xl hover:from-amber-300/70 hover:to-yellow-300/50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-amber-200/30">
                  <Star className="h-8 w-8 mb-3 text-amber-700 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center text-amber-800">Reviews</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Instagram Sync Section */}
        <div className="mt-8">
          <InstagramSyncComponent />
        </div>
      </div>
    </div>
  );
}
