
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

const initialBubbles = Array.from({ length: 15 }, (_, i) => ({ id: i, popped: false }));

export function Hero() {
  const [bubbles, setBubbles] = useState(initialBubbles);

  const handlePop = (id: number) => {
    setBubbles(prevBubbles =>
      prevBubbles.map(bubble =>
        bubble.id === id ? { ...bubble, popped: true } : bubble
      )
    );
    // Optional: Reset the bubble after the animation so it can reappear
    setTimeout(() => {
       setBubbles(prevBubbles =>
          prevBubbles.map(bubble =>
            bubble.id === id ? { ...bubble, popped: false } : bubble
          )
       );
    }, 1000);
  };


  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="bubbles">
            {bubbles.map(bubble => (
            <div
                key={bubble.id}
                className={cn('bubble', `bubble-${bubble.id + 1}`, { 'popped': bubble.popped })}
                onClick={() => handlePop(bubble.id)}
            ></div>
            ))}
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
          <Button asChild size="lg" className="rounded-full bg-pink-700 hover:bg-pink-800 text-white shadow-lg hover:scale-105 transition-transform">
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
