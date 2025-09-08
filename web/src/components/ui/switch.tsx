import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-semantic-primary data-[state=unchecked]:bg-neutral-border",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-semantic-primary",
        accent: "data-[state=checked]:bg-accent-violet-base",
        "accent-cyan": "data-[state=checked]:bg-accent-cyan-base",
        "accent-lime": "data-[state=checked]:bg-accent-lime-base",
        "accent-pink": "data-[state=checked]:bg-accent-pink-base",
        "accent-teal": "data-[state=checked]:bg-accent-teal-base",
        "accent-amber": "data-[state=checked]:bg-accent-amber-base",
        success: "data-[state=checked]:bg-semantic-success-base",
        warning: "data-[state=checked]:bg-semantic-warning-base",
        danger: "data-[state=checked]:bg-semantic-danger-base",
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  label?: string;
  helpText?: string;
  error?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, size, label, helpText, error, id, ...props }, ref) => {
  const generatedId = React.useId();
  const switchId = id || generatedId;
  const helpTextId = helpText ? `${switchId}-help` : undefined;
  const errorId = error ? `${switchId}-error` : undefined;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <SwitchPrimitives.Root
          id={switchId}
          className={cn(switchVariants({ variant, size }), className)}
          ref={ref}
          aria-describedby={cn(helpTextId, errorId)}
          aria-invalid={error ? "true" : "false"}
          {...props}
        >
          <SwitchPrimitives.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
        </SwitchPrimitives.Root>
        {label && (
          <label htmlFor={switchId} className="text-sm font-medium text-neutral-dark-onSurfaceHigh">
            {label}
          </label>
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
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };