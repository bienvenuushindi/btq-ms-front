import React, {FC} from 'react';
import {cva, VariantProps} from 'class-variance-authority';


export const buttonClasses = cva(
  [
    'rounded',
    'font-bold',
    'transition',
    'duration-200',
    'ease-in-out',
    'focus:outline-0',
  ],
  {
    variants: {
      intent: {
        text: ['bg-transparent', 'text-gray-800', 'hover:bg-gray-100'],
        primary: [
          'bg-primary text-primary-foreground ',
          'hover:bg-primary/90',
        ],
        danger:[
          "bg-destructive text-destructive-foreground hover:bg-destructive/90"
        ],
        secondary: [
          "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        ],
        tertiary: [
          'text-white',
          'bg-blue-700',
          'rounded-lg',
          'hover:bg-blue-800',
          'focus:ring-4',
          'focus:outline-none',
          'focus:ring-blue-300',
          'dark:bg-blue-600',
          'dark:hover:bg-blue-700',
          'dark:focus:ring-blue-800'
        ],
        default:[
          "bg-primary text-primary-foreground hover:bg-primary/90",
        ],
        none: [
          'bg-transparent',
        ]
      },
      size: {
        small: ['px-1', 'py-1', ' text-xs'],
        medium: ['text-sm', 'px-2', 'py-2'],
        large: ['text-xlg', 'px-4', 'py-4'],
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'small',
    },
  }
);

// In Button.tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
}


const Button: FC<ButtonProps> = ({
                                   children,
                                   className,
                                   intent,
                                   size,
                                   ...props
                                 }) => {
  return (
    <button className={buttonClasses({intent, size, className})} {...props}>
      {children}
    </button>
  );
};

export default Button;