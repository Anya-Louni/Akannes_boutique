"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className={cn(
      "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50",
      "flex items-center gap-3 p-4",
      "bg-white/98 backdrop-blur-md rounded-2xl",
      "border-2 border-primary/30 shadow-2xl shadow-primary/20",
      "transition-all duration-300",
      // Enhanced visibility with stronger background
      "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-primary/15 before:via-primary/25 before:to-primary/15 before:-z-10",
      className
    )}>
      {items.map((item, index) => (
        <div key={index} className="relative group">
          <Button
            onClick={item.onClick}
            variant="ghost"
            size="icon"
            className={cn(
              "relative w-11 h-11 rounded-xl",
              "bg-gradient-to-br from-primary/10 to-primary/5",
              "hover:from-primary/20 hover:to-primary/10",
              "border border-primary/20 hover:border-primary/30",
              "text-primary hover:text-primary",
              "transition-all duration-200 ease-out",
              "hover:scale-110 hover:shadow-lg hover:shadow-primary/20",
              "active:scale-95",
              hoveredIndex === index && "scale-110 from-primary/20 to-primary/10 border-primary/30",
              item.className
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative">
              {item.icon}
              {/* Removed blinking animation - now just a subtle indicator */}
              <div className={cn(
                "absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary/60",
                "opacity-0 scale-0 transition-all duration-200",
                hoveredIndex === index && "opacity-100 scale-100"
              )} />
            </div>
          </Button>
          
          {/* Enhanced tooltip with cute styling */}
          <div className={cn(
            "absolute -top-14 left-1/2 transform -translate-x-1/2",
            "px-3 py-2 text-xs font-medium text-white",
            "bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg",
            "opacity-0 group-hover:opacity-100",
            "transition-all duration-200 ease-out",
            "pointer-events-none whitespace-nowrap",
            "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-primary/20 before:to-accent/20 before:-z-10 before:blur-sm"
          )}>
            {item.label}
            {/* Cute arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary" />
          </div>
        </div>
      ))}
    </div>
  );
}
