
'use client';

import Link from 'next/link';
import { Menu, User, X, Heart, Search, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import { CartWidget } from '@/components/cart/cart-widget';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import styles from './header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/20 overflow-hidden">
      {/* Elegant lace border pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30">
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 group">
            <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/30">
                  <span className="text-2xl font-bold text-primary font-headline">A</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-headline text-xl font-bold text-primary">
                  Akanne's
                </h1>
                <p className="text-xs text-primary/70 -mt-1">Magical Boutique</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-2">
            {navLinks.map(({ href, label }) => (
              <Button 
                key={href} 
                variant="ghost" 
                asChild 
                className="group relative px-6 py-2 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                <Link href={href} className="flex items-center space-x-2">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {label}
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </Link>
              </Button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:inline-flex group relative rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Search className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:inline-flex group relative rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors group-hover:fill-current" />
              </Link>
            </Button>
            
            {/* Authentication */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="group relative rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                >
                  <User className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary/40 transition-colors',
                    userButtonPopoverCard: 'glass-surface border-primary/20',
                    userButtonPopoverActionButton: 'text-foreground hover:bg-primary/10',
                    userButtonPopoverActionButtonText: 'text-foreground',
                    userButtonPopoverFooter: 'hidden'
                  }
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
            
            <CartWidget />
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                variant="ghost" 
                size="icon" 
                className="group relative rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-foreground/80 group-hover:text-primary transition-colors" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground/80 group-hover:text-primary transition-colors" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-500 ease-in-out overflow-hidden bg-background/95 backdrop-blur-md',
          isMenuOpen ? 'max-h-96 opacity-100 border-t border-primary/20' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col space-y-3">
            {navLinks.map(({ href, label }) => (
              <Button 
                key={href} 
                variant="ghost" 
                asChild 
                className="group justify-start h-12 rounded-2xl hover:bg-primary/10 transition-all duration-300"
              >
                <Link 
                  href={href} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center space-x-3 px-4"
                >
                  <span className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {label}
                  </span>
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                  </div>
                </Link>
              </Button>
            ))}
          </nav>
          
          {/* Mobile Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-primary/10">
            <Button 
              variant="ghost" 
              size="icon" 
              className="group relative rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Search className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="group relative rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
              </Link>
            </Button>
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="group relative rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                >
                  <User className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary/40 transition-colors'
                  }
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}



