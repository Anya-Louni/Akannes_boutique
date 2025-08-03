import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <Sparkles className="h-16 w-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-6xl font-headline font-bold text-pink-700 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-pink-600 mb-2">Page Not Found</h2>
          <p className="text-pink-500/70 mb-8">
            Oops! This magical page seems to have disappeared into thin air.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild size="lg" className="rounded-full bg-pink-700 hover:bg-pink-800 text-white shadow-lg hover:scale-105 transition-transform">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </Button>
          
          <div className="text-sm text-pink-500/60">
            <Link href="/shop" className="hover:text-pink-600 underline">
              Browse our magical collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
