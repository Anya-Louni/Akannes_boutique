import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out will-change-transform relative disabled:pointer-events-none disabled:opacity-50 after:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary rounded-xl shadow-[0_5px_0_hsl(var(--primary-dark))] hover:bg-primary/90 active:translate-y-1 active:shadow-[0_2px_0_hsl(var(--primary-dark))]",
        destructive: "bg-destructive text-destructive-foreground rounded-xl shadow-[0_5px_0_hsl(var(--destructive)/0.8)] active:translate-y-1 active:shadow-[0_2px_0_hsl(var(--destructive)/0.8)]",
        outline: "bg-accent/80 text-accent-foreground border-accent-dark border-2 rounded-xl shadow-[0_5px_0_hsl(var(--accent-dark))] hover:bg-accent/90 active:translate-y-1 active:shadow-[0_2px_0_hsl(var(--accent-dark))]",
        secondary: "bg-secondary text-secondary-foreground rounded-xl shadow-[0_4px_0_hsl(var(--muted))] active:translate-y-0.5 active:shadow-[0_2px_0_hsl(var(--muted))]",
        ghost: "hover:bg-secondary hover:text-secondary-foreground rounded-md hover:animate-button-wobble",
        link: "text-primary underline-offset-4 hover:underline rounded-md",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-xl px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
