import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlassSurfaceProps {
  children?: ReactNode;
  className?: string;
}

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        // Liquid glass base with multiple backdrop effects
        "bg-white/5 backdrop-blur-2xl border border-white/20",
        "shadow-2xl shadow-pink-500/20 rounded-full",
        "transition-all duration-300 ease-out",
        // Inner glow effect
        "before:absolute before:inset-0 before:rounded-full",
        "before:bg-gradient-to-br before:from-white/20 before:via-pink-100/10 before:to-transparent",
        "before:shadow-inner before:shadow-white/20",
        // Outer rim with pink tint
        "after:absolute after:inset-[-1px] after:rounded-full after:-z-10",
        "after:bg-gradient-to-br after:from-pink-200/30 after:via-transparent after:to-pink-100/20",
        "after:blur-sm",
        // Enhanced hover effects
        "hover:bg-white/10 hover:border-white/30 hover:shadow-pink-400/30",
        "hover:before:from-white/30 hover:before:via-pink-100/20",
        "hover:scale-105 hover:shadow-3xl",
        className
      )}
    >
      <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
