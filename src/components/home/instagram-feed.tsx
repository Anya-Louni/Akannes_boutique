import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram as InstagramIcon, Heart, MessageCircle } from 'lucide-react';

// Demo images for Instagram feed with optimized J-fashion themed content
const feedImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&h=250&fit=crop&crop=center&q=75',
    likes: 234,
    caption: 'New gothic lolita dress collection ',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=250&h=250&fit=crop&crop=center&q=75',
    likes: 189,
    caption: 'Sweet lolita vibes ',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=250&h=250&fit=crop&crop=face&q=75',
    likes: 156,
    caption: 'Dreamy pastels for spring ',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=250&h=250&fit=crop&crop=center&q=75',
    likes: 298,
    caption: 'Customer styling their new pieces! ',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&h=250&fit=crop&crop=center&q=75',
    likes: 167,
    caption: 'Behind the scenes of our photoshoot ',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=250&h=250&fit=crop&crop=center&q=75',
    likes: 203,
    caption: 'New accessories just arrived! ',
  },
];

export function InstagramFeed() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-pink-50/50 via-rose-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-pink-700 text-shadow-magic">
            #AkannesBoutique
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Follow our magical journey and see our dolls in action on Instagram!
          </p>
          <Button asChild className="mt-6 rounded-full bg-pink-700 hover:bg-pink-800 text-white shadow-lg hover:scale-105 transition-transform">
            <Link href="https://instagram.com/akannesboutique" target="_blank">
              <InstagramIcon className="mr-2 h-5 w-5" />
              @akannesboutique
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {feedImages.map((post) => (
            <Link
              href="https://instagram.com/akannesboutique"
              target="_blank"
              key={post.id}
              className="group block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <div className="relative">
                <Image
                  src={post.src}
                  alt={post.caption}
                  width={250}
                  height={250}
                  loading={post.id <= 2 ? undefined : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  priority={post.id <= 2}
                />
                {/* Instagram-style overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{Math.floor(post.likes / 10)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 italic">
            * Demo images shown. Connect your Instagram account to display real posts.
          </p>
        </div>
      </div>
    </section>
  );
}
