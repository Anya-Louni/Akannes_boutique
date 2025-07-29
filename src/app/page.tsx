
import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Testimonials } from '@/components/home/testimonials';
import { InstagramFeed } from '@/components/home/instagram-feed';
import { PromoBanner } from '@/components/home/promo-banner';
import { LaceBorder } from '@/components/ui/lace-border';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <LaceBorder />
      <FeaturedProducts />
      <LaceBorder />
      <Testimonials />
      <LaceBorder />
      <PromoBanner />
      <LaceBorder />
      <InstagramFeed />
    </div>
  );
}
