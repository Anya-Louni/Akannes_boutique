import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Yasmine B.',
    avatar: 'https://placehold.co/100x100.png',
    text: "Absolutely in love with my dress! The quality is amazing and I feel like a real life princess. Akanne's customer service is top-notch too!",
    location: 'Algiers, Algeria',
  },
  {
    name: 'Amina L.',
    avatar: 'https://placehold.co/100x100.png',
    text: 'I finally found my dream Gyaru set here. The shipping was fast and the packaging was so cute! Will definitely shop here again.',
    location: 'Oran, Algeria',
  },
  {
    name: 'Sarah K.',
    avatar: 'https://placehold.co/100x100.png',
    text: "The details on my Gothic Lolita skirt are breathtaking. It's even more beautiful in person. Thank you for bringing these styles to Algeria!",
    location: 'Constantine, Algeria',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-shadow-magic">
            Words from our Dolls
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            See what our lovely customers have to say about their magical experience.
          </p>
          <div className="mt-4 flex justify-center">
            <Heart className="h-8 w-8 text-accent animate-pulse" />
          </div>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full flex flex-col justify-between p-6 rounded-2xl shadow-lg bg-background/80 backdrop-blur-sm border-primary/10">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="anime girl" />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-bold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                      <p className="text-foreground/80 italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
