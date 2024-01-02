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
          'bg-lightBlue-100',
          'text-white',
          'border-transparent',
          'hover:bg-lightBlue-200',
        ],
        danger:[
         "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
        ],
        secondary: [
          'bg-white',
          'text-black',
          'border-gray-400',
          'hover:bg-gray-100',
          'border-solid',
          'border',
          'border-gray-100',
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
          "text-gray-800 hover:text-white bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
        ],
        none: [
          'bg-transparent',
        ]
      },
      size: {
        small: ['px-1', 'py-1', ' text-xs'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4'],
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
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