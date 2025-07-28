'use client';

import Link from 'next/link';
import { Menu, ShoppingCart, User, X, Heart, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>
          
          <nav className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
            {navLinks.map(({ href, label }) => (
              <Button key={href} variant="ghost" asChild>
                <Link href={href} className="text-base font-medium text-foreground/80 hover:text-primary transition-colors duration-300">
                  {label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Search className="h-6 w-6 text-foreground/80" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Heart className="h-6 w-6 text-foreground/80" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6 text-foreground/80" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6 text-foreground/80" />
            </Button>
            <div className="md:hidden">
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col items-center gap-4 px-2 pt-2 pb-4 border-t border-primary/10">
          {navLinks.map(({ href, label }) => (
            <Button key={href} variant="ghost" asChild className="w-full">
              <Link href={href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground hover:text-primary">
                {label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
