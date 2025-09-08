'use client';

import { forwardRef, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'default', 
    hover = true, 
    className = '', 
    children, 
    ...props 
  }, ref) => {

    const baseClasses = `
      rounded-xl transition-all duration-300 transform
      ${hover ? 'cursor-pointer' : ''}
    `;

    const variantClasses = {
      default: `
        border border-zinc-800 bg-zinc-900
        ${hover ? 'hover:border-zinc-700 hover:bg-zinc-800 hover:scale-105 hover:shadow-xl' : ''}
      `,
      elevated: `
        bg-zinc-900 shadow-lg
        ${hover ? 'hover:shadow-2xl hover:scale-105 hover:bg-zinc-800' : ''}
      `,
      outlined: `
        border-2 border-zinc-700 bg-transparent
        ${hover ? 'hover:border-zinc-600 hover:bg-zinc-900 hover:scale-105' : ''}
      `
    };

    const classes = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${className}
    `.trim();

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
