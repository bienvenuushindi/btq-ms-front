import React, { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

type DefaultVariants = {
    intent?: string;
    size?: 'small' | 'medium' | 'large';
};

export const dotClasses = cva(
    [
        'inline-block',
        'rounded-full',
        'mr-1', // Add margin to the right
        'flex-shrink-0', // Prevent flex items from shrinking
    ],
    {
        variants: {
            variant: {
                primary: ['bg-blue-500'],
                secondary: ['bg-gray-500'],
                success: ['bg-green-800'],
                danger: ['bg-red-800'],
                warning: ['bg-yellow-800'],
            },
            size: {
                small: 'p-1',   // Adjust size for small using padding
                medium: 'p-2',  // Adjust size for medium using padding
                large: 'p-3',   // Adjust size for large using padding
            },
        },
        defaultVariants: {
            intent: 'default',
            size: 'medium',
        } as DefaultVariants,
    }
);

export interface DotProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof dotClasses>,
        DefaultVariants {
    size?: 'small' | 'medium' | 'large';
}

const Dot: FC<DotProps> = ({ children, className, variant, size, ...props }) => {
    return (
        <span className={dotClasses({ variant, size, className })} {...props}>
      {children}
    </span>
    );
};

export default Dot;
