import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, ShoppingBag, Star, Package, Tag, TrendingUp, Heart } from 'lucide-react';
import Link from 'next/link';
import InstagramSyncComponent from '@/components/admin/instagram-sync';

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6 min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 relative overflow-hidden">
      {/* Beautiful background patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-rose-100/20 to-purple-100/20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              ✨ Akanne's Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your magical boutique.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-pink-500 to-rose-500 border-0 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/30 transition-all duration-300 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">Total Revenue</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <DollarSign className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">4,523,189 DZD</div>
              <div className="flex items-center text-sm text-pink-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                +20.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-0 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">Sales</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">12,234</div>
              <div className="flex items-center text-sm text-purple-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                +19% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-orange-500 border-0 shadow-xl shadow-rose-500/20 hover:shadow-rose-500/30 transition-all duration-300 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">Customers</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Users className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">2,350</div>
              <div className="flex items-center text-sm text-rose-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                +180.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 border-0 shadow-xl shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all duration-300 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">Average Rating</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Star className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">4.8 ⭐</div>
              <div className="flex items-center text-sm text-yellow-100">
                <Heart className="h-4 w-4 mr-1" />
                Based on 245 reviews
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
          <Card className="col-span-4 bg-white/80 backdrop-blur-sm border border-pink-200/50 shadow-xl shadow-pink-500/5">
            <CardHeader className="border-b border-pink-100">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-pink-500" />
                Recent Orders
              </CardTitle>
              <CardDescription className="text-gray-600">You have 5 new orders this week.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100">
                  <div>
                    <p className="font-medium text-gray-800">Order #1234</p>
                    <p className="text-sm text-gray-600">Elegant Dress - Size M</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-pink-600">12,500 DZD</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <div>
                    <p className="font-medium text-gray-800">Order #1233</p>
                    <p className="text-sm text-gray-600">Magical Top - Size S</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-purple-600">8,900 DZD</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 bg-white/80 backdrop-blur-sm border border-pink-200/50 shadow-xl shadow-pink-500/5">
            <CardHeader className="border-b border-pink-100">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Star className="h-5 w-5 text-pink-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pt-6">
              <Link href="/admin/products/new" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105">
                  <ShoppingBag className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center">Add Product</span>
                </div>
              </Link>
              
              <Link href="/admin/categories" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Tag className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center">Categories</span>
                </div>
              </Link>
              
              <Link href="/admin/orders" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl hover:from-rose-600 hover:to-orange-600 transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Package className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center">View Orders</span>
                </div>
              </Link>
              
              <Link href="/admin/reviews" className="group">
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105">
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
