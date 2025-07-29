import { cn } from "@/lib/utils";

export function LaceBorder({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-8 bg-repeat-x", className)} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 C 5 0, 15 0, 20 10 S 25 20, 30 10 S 35 0, 40 10 S 45 20, 50 10 S 55 0, 60 10 S 65 20, 70 10 S 75 0, 80 10 S 85 20, 90 10 S 95 0, 100 10' fill='none' stroke='hsl(348 67% 96%)' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
    }}>
    </div>
  );
}
