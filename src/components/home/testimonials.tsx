import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Sparkles, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Yasmine B.',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face&q=80',
    text: "Absolutely in love with my dress! The quality is amazing and I feel like a real life princess. Akanne's customer service is top-notch too! ✨",
    location: 'Algiers, Algeria',
    rating: 5,
  },
  {
    name: 'Amina L.',
    avatar: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=100&h=100&fit=crop&crop=face&q=80',
    text: 'I finally found my dream Gyaru set here. The shipping was fast and the packaging was so cute! Will definitely shop here again. 💕',
    location: 'Oran, Algeria',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=100&h=100&fit=crop&crop=face&q=80',
    text: "The details on my Gothic Lolita skirt are breathtaking. It's even more beautiful in person. Thank you for bringing these styles to Algeria! 🌸",
    location: 'Constantine, Algeria',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-pink-50/50 via-rose-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-rose-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-300 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-shadow-magic">
              Words from our Dolls
            </h2>
            <Sparkles className="h-6 w-6 text-pink-500" />
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            See what our lovely customers have to say about their magical experience.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Heart className="h-6 w-6 text-pink-500 animate-pulse" />
            <Heart className="h-4 w-4 text-rose-400 animate-pulse" style={{ animationDelay: '0.5s' } as React.CSSProperties} />
            <Heart className="h-6 w-6 text-pink-500 animate-pulse" style={{ animationDelay: '1s' } as React.CSSProperties} />
          </div>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="h-full flex flex-col justify-between rounded-3xl shadow-xl bg-white/90 backdrop-blur-sm border-2 border-pink-200/50 hover:border-pink-300/70 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
                    <CardContent className="p-6">
                      {/* Rating Stars */}
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <div className="relative mb-6">
                        <div className="absolute -top-2 -left-2 text-6xl text-pink-200/50 font-serif">"</div>
                        <p className="text-gray-700 italic text-center relative z-10 leading-relaxed">
                          {testimonial.text}
                        </p>
                        <div className="absolute -bottom-4 -right-2 text-6xl text-pink-200/50 font-serif rotate-180">"</div>
                      </div>
                      
                      {/* Customer Info */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
                          <Avatar className="relative border-2 border-white">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-pink-100 text-pink-700">{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-4 text-center">
                          <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                          <p className="text-sm text-pink-600 font-medium">{testimonial.location}</p>
                        </div>
                      </div>
                      
                      {/* Decorative Hearts */}
                      <div className="flex justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                          <Heart className="h-3 w-3 text-pink-400 fill-current" />
                          <Heart className="h-4 w-4 text-rose-400 fill-current" />
                          <Heart className="h-3 w-3 text-pink-400 fill-current" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex bg-white/90 border-pink-200 hover:bg-pink-50 hover:border-pink-300" />
          <CarouselNext className="hidden sm:flex bg-white/90 border-pink-200 hover:bg-pink-50 hover:border-pink-300" />
        </Carousel>
      </div>
    </section>
  );
}
