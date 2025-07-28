import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Sparkles className="h-7 w-7 text-accent animate-pulse" />
      <h1 className="font-headline text-3xl font-bold text-primary text-shadow-magic">
        Akkane's
      </h1>
    </div>
  );
}
