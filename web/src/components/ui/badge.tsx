import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary variants using semantic colors
        primary: "border-transparent bg-semantic-primary text-neutral-dark-onSurfaceHigh",
        secondary: "border-transparent bg-semantic-secondary text-neutral-dark-onSurfaceHigh",
        
        // Accent variants
        accent: "border-transparent bg-accent-violet-base text-neutral-dark-onSurfaceHigh",
        "accent-cyan": "border-transparent bg-accent-cyan-base text-neutral-dark-onSurfaceHigh",
        "accent-lime": "border-transparent bg-accent-lime-base text-neutral-dark-onSurfaceHigh",
        "accent-pink": "border-transparent bg-accent-pink-base text-neutral-dark-onSurfaceHigh",
        "accent-teal": "border-transparent bg-accent-teal-base text-neutral-dark-onSurfaceHigh",
        "accent-amber": "border-transparent bg-accent-amber-base text-neutral-dark-onSurfaceHigh",
        
        // Feedback variants
        success: "border-transparent bg-semantic-success-base text-neutral-dark-onSurfaceHigh",
        warning: "border-transparent bg-semantic-warning-base text-neutral-dark-onSurfaceHigh",
        danger: "border-transparent bg-semantic-danger-base text-neutral-dark-onSurfaceHigh",
        info: "border-transparent bg-semantic-info-base text-neutral-dark-onSurfaceHigh",
        
        // Outline variants
        outline: "border-neutral-dark-border text-neutral-dark-onSurface",
        destructive: "border-transparent bg-semantic-danger-base text-neutral-dark-onSurfaceHigh",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function Badge({ className, variant, size, leftIcon, rightIcon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {leftIcon && <span className="mr-1">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-1">{rightIcon}</span>}
    </div>
  );
}

export { Badge, badgeVariants };