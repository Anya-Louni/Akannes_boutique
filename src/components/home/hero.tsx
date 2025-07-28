import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Magical shoujo manga aesthetic background"
          data-ai-hint="shoujo manga aesthetic"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="relative z-10 text-center p-4 animate-fadeIn">
        <h1 className={cn(
          "font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-shadow-magic",
          "text-primary"
        )}>
          Dress Your Dreams
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-foreground/80">
          Discover enchanting fashion inspired by the magical world of Japanese aesthetics. Live your fairytale.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/about">
              Our Story
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
