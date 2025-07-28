import { cn } from "@/lib/utils";

export function LaceDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-10 bg-repeat-x", className)} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='40' viewBox='0 0 100 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q 5 10, 10 20 T 20 20 M20 20 Q 25 10, 30 20 T 40 20 M40 20 Q 45 10, 50 20 T 60 20 M60 20 Q 65 10, 70 20 T 80 20 M80 20 Q 85 10, 90 20 T 100 20' fill='none' stroke='hsl(336 84% 90%)' stroke-width='1.5'/%3E%3Cpath d='M0 20 Q 5 30, 10 20 T 20 20 M20 20 Q 25 30, 30 20 T 40 20 M40 20 Q 45 30, 50 20 T 60 20 M60 20 Q 65 30, 70 20 T 80 20 M80 20 Q 85 30, 90 20 T 100 20' fill='none' stroke='hsl(336 84% 90%)' stroke-width='1.5'/%3E%3Ccircle cx='10' cy='20' r='2' fill='hsl(336 84% 90%)'/%3E%3Ccircle cx='30' cy='20' r='2' fill='hsl(336 84% 90%)'/%3E%3Ccircle cx='50' cy='20' r='2' fill='hsl(336 84% 90%)'/%3E%3Ccircle cx='70' cy='20' r='2' fill='hsl(336 84% 90%)'/%3E%3Ccircle cx='90' cy='20' r='2' fill='hsl(336 84% 90%)'/%3E%3C/svg%3E")`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
    }}>
    </div>
  );
}
