
import type { Metadata } from 'next';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { CartProvider } from '@/context/cart-context';
import ClickSpark from '@/components/ui/click-spark';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Akkane's Magical Boutique",
  description: 'Your magical online boutique for Lolita, Gyaru, and other Japanese street fashion styles. Based in Algeria, we offer a curated collection of dresses, skirts, accessories, and more to help you live your fairytale.',
  keywords: ['Lolita fashion', 'Gyaru', 'Japanese street fashion', 'kawaii fashion', 'Akkane', 'Algeria', 'boutique', 'e-commerce'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", playfair.variable, ptSans.variable)}>
      <body className={cn('antialiased min-h-screen flex flex-col font-body')}>
        <ClickSpark>
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </CartProvider>
        </ClickSpark>
      </body>
    </html>
  );
}
