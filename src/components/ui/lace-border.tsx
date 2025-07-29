
import { cn } from "@/lib/utils";

export function LaceBorder({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-[75px] bg-repeat-x", className)} style={{
        backgroundImage: 'url("/ribbon.png")',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
    }}>
    </div>
  );
}
