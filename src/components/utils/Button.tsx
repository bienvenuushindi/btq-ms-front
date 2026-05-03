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
        text: ['bg-transparent', 'text-primary', 'hover:bg-blue-50'],
        primary: [
          'bg-primary text-primary-foreground ',
          'shadow-[0_12px_22px_rgba(37,99,235,0.22)] hover:bg-primary/90',
        ],
        danger:[
          "bg-destructive text-destructive-foreground hover:bg-destructive/90"
        ],
        secondary: [
          "bg-secondary text-secondary-foreground border border-sky-200 hover:bg-secondary/80"
        ],
        tertiary: [
          'text-primary',
          'bg-blue-50',
          'rounded-lg',
          'hover:bg-blue-100',
          'focus:ring-4',
          'focus:outline-none',
          'focus:ring-blue-200'
        ],
        default:[
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_12px_22px_rgba(37,99,235,0.22)]",
        ],
        none: [
          'bg-transparent',
        ]
      },
      size: {
        small: ['px-2', 'py-1.5', ' text-xs'],
        medium: ['text-sm', 'px-3', 'py-2'],
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
