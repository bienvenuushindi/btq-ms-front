import React, {FC} from 'react';
import {cva, VariantProps} from 'class-variance-authority';

type DefaultVariants = {
  intent?: string;
  size?: 'small' | 'medium' | 'large';
};

export const badgeClasses = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-full',
    'font-semibold',
    'px-2',
  ],
  {
    variants: {
      variant: {
        primary: ["border border-input bg-secondary text-secondary-foreground hover:bg-secondary/80"],
        secondary: ['bg-slate-100 text-slate-700'],
        success: ['bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-200'],
        danger: ['bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200'],
        warning: ['bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200'],
      },
      size: {
        small: 'text-xs',   // Add small size class
        medium: 'text-sm',  // Add medium size class
        large: 'text-lg',   // Add large size class
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'medium',
    }  as DefaultVariants,
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeClasses>,
    DefaultVariants {
  size?: 'small' | 'medium' | 'large';
}


const Badge: FC<BadgeProps> = ({ children, className, variant, size, ...props }) => {
  return (
    <span className={badgeClasses({ variant, size, className })} {...props}>
      {children}
    </span>
  );
};

export default Badge;
