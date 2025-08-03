"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Logo from '@/components/icons/Logo';
import { LayoutDashboard, ShoppingBag, Users, Star, Settings, LogOut, Home, Tag, Package } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Dock from '@/components/admin/Dock';
import StockAlerts from '@/components/admin/stock-alerts';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-background to-primary/5 relative pb-32">
      {/* Lace border pattern at top */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>
      
      {/* Stock Alerts */}
      <StockAlerts />
      
      <main className="max-w-7xl mx-auto p-6">
        <div className="rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl border border-primary/10 p-8 mt-8">
          {/* Admin header with cute styling */}
          <div className="mb-8 text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur opacity-30"></div>
              <h1 className="relative text-2xl font-bold text-primary font-headline">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-sm text-primary/70 mt-2">Manage your magical boutique</p>
          </div>
          {children}
        </div>
      </main>
      <Dock
        items={[
          {
            icon: <LayoutDashboard className="h-6 w-6" />,
            label: 'Dashboard',
            onClick: () => router.push('/admin'),
          },
          {
            icon: <Tag className="h-6 w-6" />,
            label: 'Categories',
            onClick: () => router.push('/admin/categories'),
          },
          {
            icon: <ShoppingBag className="h-6 w-6" />,
            label: 'Products',
            onClick: () => router.push('/admin/products'),
          },
          {
            icon: <Package className="h-6 w-6" />,
            label: 'Orders',
            onClick: () => router.push('/admin/orders'),
          },
          {
            icon: <Star className="h-6 w-6" />,
            label: 'Reviews',
            onClick: () => router.push('/admin/reviews'),
          },
          {
            icon: <Settings className="h-6 w-6" />,
            label: 'Settings',
            onClick: () => router.push('/admin/settings'),
          },
          {
            icon: <Home className="h-6 w-6" />,
            label: 'Store',
            onClick: () => router.push('/'),
          },
        ]}
      />
    </div>
  );
}
