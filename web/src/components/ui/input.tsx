import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-input w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-neutral-dark-border bg-neutral-dark-surface text-neutral-dark-onSurfaceHigh placeholder:text-neutral-dark-onSurfaceLow focus-visible:ring-semantic-primary",
        ghost: "border-transparent bg-transparent text-neutral-dark-onSurfaceHigh placeholder:text-neutral-dark-onSurfaceLow focus-visible:ring-semantic-primary",
        filled: "border-transparent bg-neutral-dark-surfaceAlt text-neutral-dark-onSurfaceHigh placeholder:text-neutral-dark-onSurfaceLow focus-visible:ring-semantic-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helpText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, helpText, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const helpTextId = helpText ? `${inputId}-help` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-neutral-dark-onSurfaceHigh">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-dark-onSurfaceLow">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            className={cn(
              inputVariants({ variant }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-semantic-danger-base focus-visible:ring-semantic-danger-base",
              className
            )}
            ref={ref}
            aria-describedby={cn(helpTextId, errorId)}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-dark-onSurfaceLow">
              {rightIcon}
            </div>
          )}
        </div>
        {helpText && !error && (
          <p id={helpTextId} className="text-xs text-neutral-dark-onSurfaceLow">
            {helpText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-semantic-danger-base" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };