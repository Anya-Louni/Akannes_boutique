import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Testimonials } from '@/components/home/testimonials';
import { InstagramFeed } from '@/components/home/instagram-feed';
import { PromoBanner } from '@/components/home/promo-banner';
import { LaceDivider } from '@/components/ui/lace-divider';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <LaceDivider />
      <FeaturedProducts />
      <Testimonials />
      <PromoBanner />
      <InstagramFeed />
    </div>
  );
}
