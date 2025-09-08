import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary variants using semantic colors
        primary: "bg-semantic-primary text-neutral-dark-onSurfaceHigh hover:bg-semantic-primaryHover focus-ring",
        secondary: "bg-semantic-secondary text-neutral-dark-onSurfaceHigh hover:bg-semantic-secondaryHover focus-ring",
        
        // Accent variants
        accent: "bg-accent-violet-base text-neutral-dark-onSurfaceHigh hover:bg-accent-violet-hover focus-ring",
        "accent-cyan": "bg-accent-cyan-base text-neutral-dark-onSurfaceHigh hover:bg-accent-cyan-hover focus-ring",
        "accent-lime": "bg-accent-lime-base text-neutral-dark-onSurfaceHigh hover:bg-accent-lime-hover focus-ring",
        "accent-pink": "bg-accent-pink-base text-neutral-dark-onSurfaceHigh hover:bg-accent-pink-hover focus-ring",
        "accent-teal": "bg-accent-teal-base text-neutral-dark-onSurfaceHigh hover:bg-accent-teal-hover focus-ring",
        "accent-amber": "bg-accent-amber-base text-neutral-dark-onSurfaceHigh hover:bg-accent-amber-hover focus-ring",
        
        // Feedback variants
        success: "bg-semantic-success-base text-neutral-dark-onSurfaceHigh hover:bg-semantic-success-hover focus-ring",
        warning: "bg-semantic-warning-base text-neutral-dark-onSurfaceHigh hover:bg-semantic-warning-hover focus-ring",
        danger: "bg-semantic-danger-base text-neutral-dark-onSurfaceHigh hover:bg-semantic-danger-hover focus-ring",
        info: "bg-semantic-info-base text-neutral-dark-onSurfaceHigh hover:bg-semantic-info-hover focus-ring",
        
        // Outline variants
        outline: "border border-neutral-dark-border bg-transparent text-neutral-dark-onSurface hover:bg-neutral-dark-surfaceAlt focus-ring",
        ghost: "bg-transparent text-neutral-dark-onSurface hover:bg-neutral-dark-surfaceAlt focus-ring",
        
        // Destructive variant
        destructive: "bg-semantic-danger-base text-neutral-dark-onSurfaceHigh hover:bg-semantic-danger-hover focus-ring",
      },
      size: {
        sm: "h-button-sm px-3 py-1.5 text-xs",
        md: "h-button-md px-4 py-2 text-sm",
        lg: "h-button-lg px-6 py-3 text-base",
        icon: "h-button-md w-button-md",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };