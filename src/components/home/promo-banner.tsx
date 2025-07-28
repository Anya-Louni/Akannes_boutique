import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function PromoBanner() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-primary/10 rounded-3xl overflow-hidden text-center p-8 md:p-16 relative border-2 border-primary/30 shadow-xl">
          <div className="absolute -inset-2 frilly-border opacity-50"></div>
          <div className="relative z-10 animate-fadeIn">
            <div className="flex justify-center mb-4">
              <Gift className="h-12 w-12 text-primary" />
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-shadow-magic">
              Special Summer Sale!
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary/80">
              Get up to 30% off on selected Sweet Lolita & Shoujo items. <br /> Your dream outfit is waiting!
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full shadow-lg hover:scale-105 transition-transform">
              <Link href="/shop?sale=true">
                Shop the Sale
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
