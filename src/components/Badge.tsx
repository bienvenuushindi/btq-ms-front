import React, {FC} from 'react';
import {cva, VariantProps} from 'class-variance-authority';


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
        primary: ['bg-blue-100 text-blue-800'],
        secondary: ['bg-gray-100 text-gray-800'],
        success: ['bg-green-100 text-green-800'],
        danger: ['bg-red-100 text-red-800'],
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
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeClasses> {
  size?: 'small' | 'medium' | 'large'; // Define size prop
}

const Badge: FC<BadgeProps> = ({ children, className, variant, size, ...props }) => {
  return (
    <span className={badgeClasses({ variant, size, className })} {...props}>
      {children}
    </span>
  );
};

export default Badge;