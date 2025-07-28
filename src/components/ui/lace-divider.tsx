import { cn } from "@/lib/utils";

export function LaceDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-8 bg-repeat-x", className)} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.94 11.5c2.4 0 2.4 3 4.8 3s2.4-3 4.8-3 2.4 3 4.8 3 2.4-3 4.8-3 2.4 3 4.8 3 2.4-3 4.8-3 2.4 3 4.8 3 2.4-3 4.8-3 2.4 3 4.8 3 2.4-3 4.8-3 .74-2.2 3.8-2.2M59.06 11.5c-2.4 0-2.4 3-4.8 3s-2.4-3-4.8-3-2.4 3-4.8 3-2.4-3-4.8-3-2.4 3-4.8 3-2.4-3-4.8-3-2.4 3-4.8 3-2.4-3-4.8-3-2.4 3-4.8 3-2.4-3-4.8-3c-3.06 0-3.8-2.2-3.8-2.2' fill='none' stroke='%23F070A1' stroke-width='1.5'/%3E%3C/svg%3E")`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
    }}>
    </div>
  );
}
