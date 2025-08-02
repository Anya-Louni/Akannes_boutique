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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-pink-200/60 animate-slideDown"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-pink-200/50">
          <h3 className="text-xl font-semibold text-pink-800">Search our magical collection</h3>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-pink-100 text-pink-600 flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-500" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search for dresses, accessories, or styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 rounded-full border-2 border-pink-200 focus:border-pink-400 bg-white text-pink-900 placeholder:text-pink-500/70 h-14 text-lg"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="rounded-full h-14 px-8 bg-pink-700 hover:bg-pink-800 text-white font-semibold shadow-lg hover:scale-105 transition-transform flex-shrink-0"
            >
              Search
            </Button>
          </form>
          
          {/* Quick Searches */}
          <div className="pt-4 border-t border-pink-200/50">
            <p className="text-sm text-pink-600/70 mb-3 font-medium">Quick searches:</p>
            <div className="flex flex-wrap gap-3">
              {['Lolita dresses', 'Gyaru accessories', 'Kawaii', 'Hair accessories'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    router.push(`/shop?search=${encodeURIComponent(term)}`);
                    onClose();
                  }}
                  className="px-4 py-2 text-sm rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors border border-pink-200 hover:border-pink-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
