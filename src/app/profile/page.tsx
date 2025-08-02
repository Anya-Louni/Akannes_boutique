'use client';

import { UserProfile, useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Package, Settings } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-headline text-primary mb-8">
          Welcome back, {user.firstName || user.username}!
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass-surface border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Wishlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-sm text-muted-foreground">items saved</p>
              </CardContent>
            </Card>

            <Card className="glass-surface border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-sm text-muted-foreground">total orders</p>
              </CardContent>
            </Card>

            <Card className="glass-surface border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage your account preferences and settings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Profile Component */}
          <div className="lg:col-span-2">
            <div className="glass-surface rounded-2xl p-6">
              <UserProfile 
                appearance={{
                  elements: {
                    card: 'bg-transparent shadow-none',
                    navbar: 'bg-transparent',
                    navbarButton: 'text-primary hover:bg-primary/10',
                    navbarButtonActive: 'bg-primary/20 text-primary',
                    headerTitle: 'text-primary font-headline',
                    headerSubtitle: 'text-muted-foreground',
                    formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                    formFieldInput: 'bg-background border-border',
                    profileSectionTitle: 'text-primary',
                    profileSectionContent: 'text-foreground'
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
