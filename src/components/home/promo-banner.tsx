import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function PromoBanner() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-pink-100/60 via-rose-100/40 to-purple-100/60 rounded-3xl overflow-hidden text-center p-8 md:p-16 relative border-2 border-pink-200/50 shadow-xl backdrop-blur-sm">
          <div className="relative z-10 animate-fadeIn">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-12 w-12 text-pink-600" />
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-pink-700 text-shadow-magic">
              Discover Your Magic
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-pink-600/80">
              Explore our enchanting collection of carefully curated pieces. <br /> 
              Find the perfect outfit that speaks to your unique style.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full shadow-lg hover:scale-105 transition-transform bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
              <Link href="/shop">
                Explore Collection
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
