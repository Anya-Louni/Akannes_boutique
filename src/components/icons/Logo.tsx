import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Sparkles className="h-6 w-6 text-primary animate-pulse" />
      <h1 className="font-headline text-2xl font-bold text-primary text-shadow-magic">
        Akkane's Boutique
      </h1>
    </div>
  );
}
