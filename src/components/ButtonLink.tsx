import React, {FC} from 'react';
import {VariantProps} from 'class-variance-authority';
import {buttonClasses} from '@/components/Button';
import Link from 'next/link';

export interface ButtonLinkProps
  extends React.HTMLAttributes<HTMLLinkElement>,
    VariantProps<typeof buttonClasses> {
  href?: string; // Make href optional
  addAction?: string; // Add addAction prop
}

const ButtonLink: FC<ButtonLinkProps> = ({
                                   children,
                                   className,
                                   intent,
                                   size,
                                   ...props
                                 }: any) => {
  return (
    <Link className={buttonClasses({intent, size, className})} {...props}>
      {children}
    </Link>
  );
};

export default ButtonLink;