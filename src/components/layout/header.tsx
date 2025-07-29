
'use client';

import Link from 'next/link';
import { Menu, User, X, Heart, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import { CartWidget } from '@/components/cart/cart-widget';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 shadow-sm bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 backdrop-blur-lg relative">
      {/* Shimmer effect */}
      <div className="absolute inset-0 w-full h-full shimmer-bg pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
          </div>

          <nav className="hidden md:flex md:items-center md:gap-3 lg:gap-4">
            {navLinks.map(({ href, label }) => (
              <Button key={href} variant="ghost" asChild className="rounded-lg px-5 py-2 text-xl font-semibold bg-white hover:bg-pink-50 text-primary shadow-sm border border-pink-100 transition-all duration-200">
                <Link href={href} className="">
                  {label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex bg-white hover:bg-purple-50 shadow-sm border border-purple-100">
              <Search className="h-7 w-7 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex bg-white hover:bg-pink-50 shadow-sm border border-pink-100">
              <Heart className="h-7 w-7 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white hover:bg-blue-50 shadow-sm border border-blue-100">
              <User className="h-7 w-7 text-primary" />
            </Button>
            <CartWidget />
            <div className="md:hidden">
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon" className="bg-white hover:bg-pink-50 shadow-sm border border-pink-100">
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
            
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col items-center gap-4 px-4 pt-4 pb-6 border-t border-primary/10 bg-white rounded-b-2xl shadow-sm">
          {navLinks.map(({ href, label }) => (
            <Button key={href} variant="ghost" asChild className="w-full rounded-lg px-5 py-3 text-xl font-semibold bg-pink-50 hover:bg-white text-primary shadow-sm border border-pink-100 transition-all duration-200">
              <Link href={href} onClick={() => setIsMenuOpen(false)} className="">
                {label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

    </header>
  );
}



