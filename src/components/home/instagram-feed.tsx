import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram as InstagramIcon } from 'lucide-react';

const feedImages = [
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
];

export function InstagramFeed() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-shadow-magic">
            #AkkanesBoutique
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Follow our magical journey and see our dolls in action on Instagram!
          </p>
          <Button asChild variant="outline" className="mt-6 rounded-full bg-background/50 backdrop-blur-sm">
            <Link href="https://instagram.com/akkanesboutique" target="_blank">
              <InstagramIcon className="mr-2 h-5 w-5" />
              @akkanesboutique
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {feedImages.map((src, index) => (
            <Link
              href="https://instagram.com/akkanesboutique"
              target="_blank"
              key={index}
              className="group block overflow-hidden rounded-xl shadow-md"
            >
              <Image
                src={src}
                alt={`Instagram post ${index + 1}`}
                width={400}
                height={400}
                className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="lolita fashion"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
