import React, { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

export const textClasses = cva(
  [
    "text-md font-medium text-gray-700 py-0.5"
  ],
  {
    variants: {
      size: {
        small: ['text-sm'],
        medium: ['text-base'],
        large: ['text-lg'],
      },
      intent: {
        primary: ['text-blue-500'],
        secondary: ['text-gray-500'],
        success: ['text-green-500'],
        danger: ['text-red-500'],
      },
    },
    defaultVariants: {
      size: 'small',
      intent: 'primary',
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textClasses> {}

const Text: FC<TextProps> = ({ children, className, size, intent, ...props }) => {
  return (
    <span className={textClasses({ size, intent, className })} {...props}>
      {children}
    </span>
  );
};

export default Text;