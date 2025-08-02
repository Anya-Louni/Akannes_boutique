import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram as InstagramIcon, Heart, MessageCircle } from 'lucide-react';

// Demo images for Instagram feed - replace with actual Instagram API data
const feedImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop&crop=face',
    likes: 234,
    caption: 'New gothic lolita dress collection ✨',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&crop=center',
    likes: 189,
    caption: 'Sweet lolita vibes 💕',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center',
    likes: 156,
    caption: 'Dreamy pastels for spring 🌸',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop&crop=face',
    likes: 298,
    caption: 'Customer styling their new pieces! 💖',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&crop=center',
    likes: 167,
    caption: 'Behind the scenes of our photoshoot 📸',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center',
    likes: 203,
    caption: 'New accessories just arrived! ✨',
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
          <Button asChild variant="outline" className="mt-6 rounded-full bg-white/60 backdrop-blur-sm border-pink-200 hover:bg-pink-50 hover:border-pink-300">
            <Link href="https://instagram.com/akannesboutique" target="_blank">
              <InstagramIcon className="mr-2 h-5 w-5 text-pink-600" />
              <span className="text-pink-700">@akannesboutique</span>
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
                  width={400}
                  height={400}
                  className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
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
