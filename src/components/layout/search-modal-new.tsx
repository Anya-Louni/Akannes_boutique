'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Search Bar positioned under header */}
      <div className="fixed top-20 left-0 right-0 z-50 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="glass-surface border-2 border-pink-200/50 rounded-2xl p-4 shadow-xl animate-slideDown">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-500" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for dresses, accessories, or styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-2 border-pink-200 focus:border-pink-400 bg-white/90 text-pink-900 placeholder:text-pink-500/70 h-12"
                />
              </div>
              <Button
                type="submit"
                className="rounded-full h-12 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Search
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full h-12 w-12 hover:bg-pink-100 text-pink-600"
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
            
            <div className="mt-4 pt-4 border-t border-pink-200/50">
              <p className="text-sm text-pink-600/70 mb-2">Quick searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Lolita dresses', 'Gyaru accessories', 'Kawaii', 'Hair accessories'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      router.push(`/shop?search=${encodeURIComponent(term)}`);
                      onClose();
                    }}
                    className="px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
