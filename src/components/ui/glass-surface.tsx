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
        "bg-white/10 backdrop-blur-md border border-white/20",
        "shadow-lg shadow-black/10 rounded-full",
        "transition-all duration-300 ease-out",
        "hover:bg-white/15 hover:border-white/30",
        "dark:bg-black/10 dark:border-white/10",
        "dark:hover:bg-black/15 dark:hover:border-white/20",
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
