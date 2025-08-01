"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GlassSurface from "@/components/ui/glass-surface";
import { cn } from "@/lib/utils";

export type DockItemData = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
};

export default function Dock({ items, className = "" }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <GlassSurface className={cn("px-6 py-3", className)}>
        <div className="flex items-center gap-3">
          {items.map((item, index) => (
            <div key={index} className="relative group">
              <Button
                onClick={item.onClick}
                variant="ghost"
                size="icon"
                className={cn(
                  "relative w-12 h-12 rounded-xl",
                  "bg-white/10 hover:bg-white/20",
                  "border border-white/20 hover:border-white/30",
                  "text-stone-600 dark:text-stone-300",
                  "hover:text-stone-800 dark:hover:text-stone-100",
                  "transition-all duration-200 ease-out",
                  "hover:scale-110 hover:shadow-lg",
                  "active:scale-95",
                  hoveredIndex === index && "scale-110 bg-white/20 border-white/30",
                  item.className
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative">
                  {item.icon}
                  {/* Subtle indicator dot that appears on hover */}
                  <div className={cn(
                    "absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500",
                    "opacity-0 scale-0 transition-all duration-200",
                    hoveredIndex === index && "opacity-100 scale-100"
                  )} />
                </div>
              </Button>
              
              {/* Glass-style tooltip */}
              <div className={cn(
                "absolute -top-16 left-1/2 transform -translate-x-1/2",
                "px-3 py-2 text-xs font-medium text-white",
                "bg-black/60 backdrop-blur-sm rounded-xl shadow-lg",
                "opacity-0 group-hover:opacity-100",
                "transition-all duration-200 ease-out",
                "pointer-events-none whitespace-nowrap",
                "border border-white/20"
              )}>
                {item.label}
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/60" />
              </div>
            </div>
          ))}
        </div>
      </GlassSurface>
    </div>
  );
}
