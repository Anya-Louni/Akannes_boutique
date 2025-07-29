import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Testimonials } from '@/components/home/testimonials';
import { InstagramFeed } from '@/components/home/instagram-feed';
import { PromoBanner } from '@/components/home/promo-banner';
import { DrippyChocolateBorder } from '@/components/ui/drippy-chocolate-border';
import { StyleQuiz } from '@/components/home/style-quiz';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <DrippyChocolateBorder />
      <FeaturedProducts />
      <StyleQuiz />
      <Testimonials />
      <PromoBanner />
      <InstagramFeed />
    </div>
  );
}
