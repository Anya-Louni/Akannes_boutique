import Link from 'next/link';
import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import Logo from '@/components/icons/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-primary/20 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your magical wardrobe for Japanese-inspired fashion.
            </p>
            <div className="flex gap-4">
              <Link href="https://instagram.com/akkanesboutique" target="_blank">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" target="_blank">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" target="_blank">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
             <div>
              <h3 className="font-headline text-lg font-semibold text-foreground">Shop</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/shop?category=gothic-lolita" className="text-muted-foreground hover:text-primary transition-colors">Gothic Lolita</Link></li>
                <li><Link href="/shop?category=sweet-lolita" className="text-muted-foreground hover:text-primary transition-colors">Sweet Lolita</Link></li>
                <li><Link href="/shop?category=gyaru" className="text-muted-foreground hover:text-primary transition-colors">Gyaru</Link></li>
                <li><Link href="/shop?category=shoujo" className="text-muted-foreground hover:text-primary transition-colors">Shoujo</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-headline text-lg font-semibold text-foreground">About Us</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-headline text-lg font-semibold text-foreground">Newsletter</h3>
              <p className="mt-4 text-sm text-muted-foreground">Join our magical world and get updates on new arrivals!</p>
              <form className="mt-4 flex gap-2">
                <Input type="email" placeholder="your.email@example.com" className="bg-background" />
                <Button type="submit" variant="default" size="icon"><Heart className="h-4 w-4" /></Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Akkane's Magical Boutique. Made with <Heart className="inline h-4 w-4 text-primary" /> in Algeria.</p>
        </div>
      </div>
    </footer>
  );
}
