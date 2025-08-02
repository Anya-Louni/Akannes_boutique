import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="py-16 sm:py-24 bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-shadow-magic">
            Discover Your Magic
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Explore our enchanting collection of carefully curated pieces. Find the perfect outfit that speaks to your unique style.
          </p>
          <div className="mt-4 flex justify-center">
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg" className="rounded-full bg-pink-700 hover:bg-pink-800 text-white shadow-lg hover:scale-105 transition-transform">
            <Link href="/shop">
              Explore Collection
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
