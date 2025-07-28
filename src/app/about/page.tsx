import Image from 'next/image';
import { Sparkles, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="animate-fadeIn">
      <div className="relative h-64 md:h-96">
        <Image
          src="https://placehold.co/1800x600.png"
          alt="A dreamy, pastel banner with ribbons and roses"
          data-ai-hint="pastel ribbons roses"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent flex items-center justify-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-white text-shadow-magic drop-shadow-lg">
            Our Story
          </h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <div className="space-y-12 text-lg text-foreground/80 text-center">
            <div className="flex justify-center">
                <Heart className="h-12 w-12 text-primary animate-pulse" />
            </div>

          <p className="font-headline text-2xl text-primary leading-relaxed">
            Akkane's Magical Boutique was born from a lifelong passion for the enchanting worlds of shoujo manga and the intricate elegance of Japanese street fashion.
          </p>
          
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
                <div className="aspect-square relative rounded-full overflow-hidden shadow-xl border-4 border-white">
                    <Image src="https://placehold.co/400x400.png" alt="Boutique founder illustration" data-ai-hint="anime girl founder" fill className="object-cover" />
                </div>
            </div>
            <div className="md:col-span-3 text-left">
                <p>
                    Growing up in Algeria, our founder, Akkane, spent hours lost in stories of magical girls and rose-adorned heroines. She dreamed of a place where she and others could find clothing that truly expressed their inner princess, their bold gyaru spirit, or their gentle shoujo heart.
                </p>
                <p className="mt-4">
                    That dream became this boutique: a carefully curated collection of Gothic Lolita, Sweet Lolita, Gyaru, and Shoujo styles, bringing a touch of Japanese magic to the heart of Algeria.
                </p>
            </div>
          </div>
          
          <div className="flex justify-center">
             <Sparkles className="h-12 w-12 text-accent animate-pulse" />
          </div>

          <p>
            We believe fashion is a form of self-expression and magic. Each piece in our collection is chosen with love, hoping to empower you to tell your own story and live out your own fairytale.
          </p>
          
          <p className="font-headline text-xl text-primary">
            Thank you for being part of our world.
          </p>
        </div>
      </div>
    </div>
  );
}
