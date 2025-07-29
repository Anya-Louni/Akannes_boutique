
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/ChatGPT Image Jul 29, 2025, 03_00_10 PM.png"
        alt="Logo"
        width={60}
        height={60}
        className="h-20 w-auto"
        priority
      />
    </div>
  );
}
