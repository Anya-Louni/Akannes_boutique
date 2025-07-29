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
import Dock from '@/components/admin/Dock';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative pb-32">
      <main className="max-w-7xl mx-auto p-6">
        <div className="rounded-3xl bg-white/80 shadow-xl p-8 mt-8">
          {children}
        </div>
      </main>
      <Dock
        items={[
          {
            icon: <LayoutDashboard className="h-8 w-8" />,
            label: 'Dashboard',
            onClick: () => window.location.href = '/admin',
          },
          {
            icon: <Tag className="h-8 w-8" />,
            label: 'Categories',
            onClick: () => window.location.href = '/admin/categories',
          },
          {
            icon: <ShoppingBag className="h-8 w-8" />,
            label: 'Products',
            onClick: () => window.location.href = '/admin/products',
          },
          {
            icon: <Package className="h-8 w-8" />,
            label: 'Orders',
            onClick: () => window.location.href = '/admin/orders',
          },
          {
            icon: <Star className="h-8 w-8" />,
            label: 'Reviews',
            onClick: () => window.location.href = '/admin/reviews',
          },
          {
            icon: <Settings className="h-8 w-8" />,
            label: 'Settings',
            onClick: () => window.location.href = '/admin/settings',
          },
          {
            icon: <Home className="h-8 w-8" />,
            label: 'Store',
            onClick: () => window.location.href = '/',
          },
        ]}
      />
    </div>
  );
}
