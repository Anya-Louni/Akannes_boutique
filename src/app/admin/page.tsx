import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, ShoppingBag, Star, Package, Tag, TrendingUp, Heart, AlertTriangle, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import InstagramSyncComponent from '@/components/admin/instagram-sync';
import { getDashboardStats, formatCurrency, formatGrowth } from '@/lib/dashboard';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 min-h-screen bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-yellow-50/30 relative overflow-hidden">
      {/* Beautiful background patterns with warm browns */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-orange-100/20 to-yellow-100/20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              ✨ Akanne's Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your magical boutique.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-amber-600 to-orange-600 border-0 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">Total Revenue</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <DollarSign className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{formatCurrency(stats.totalRevenue)}</div>
              <div className="flex items-center text-sm text-amber-100">
                {stats.monthlyGrowth.revenue >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {formatGrowth(stats.monthlyGrowth.revenue)} from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 to-red-600 border-0 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">Sales</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.totalSales.toLocaleString()}</div>
              <div className="flex items-center text-sm text-orange-100">
                {stats.monthlyGrowth.sales >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {formatGrowth(stats.monthlyGrowth.sales)} from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-600 to-orange-600 border-0 shadow-xl shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all duration-300 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">Customers</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Users className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.totalCustomers.toLocaleString()}</div>
              <div className="flex items-center text-sm text-yellow-100">
                {stats.monthlyGrowth.customers >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {formatGrowth(stats.monthlyGrowth.customers)} from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-yellow-500 border-0 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">Average Rating</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Star className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">
                {stats.averageRating > 0 ? `${stats.averageRating.toFixed(1)} ⭐` : 'No ratings'}
              </div>
              <div className="flex items-center text-sm text-amber-100">
                <Heart className="h-4 w-4 mr-1" />
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
          <Card className="col-span-4 bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-xl shadow-amber-500/5">
            <CardHeader className="border-b border-amber-100">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-amber-600" />
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
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                      <div>
                        <p className="font-medium text-gray-800">Order #{order.id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                        <p className="text-xs text-gray-500 capitalize">{order.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-amber-700">{formatCurrency(order.total)}</p>
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

          <Card className="col-span-3 bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-xl shadow-amber-500/5">
            <CardHeader className="border-b border-amber-100">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pt-6">
              <Link href="/admin/products/new" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105">
                  <ShoppingBag className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center">Add Product</span>
                </div>
              </Link>
              
              <Link href="/admin/categories" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Tag className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center">Categories</span>
                </div>
              </Link>
              
              <Link href="/admin/orders" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Package className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center">View Orders</span>
                </div>
              </Link>
              
              <Link href="/admin/reviews" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Star className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center">Reviews</span>
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
