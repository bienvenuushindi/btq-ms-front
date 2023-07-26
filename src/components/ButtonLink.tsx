import React, {FC} from 'react';
import {VariantProps} from 'class-variance-authority';
import {buttonClasses} from '@/components/Button';
import Link from 'next/link';

export interface ButtonLinkProps
  extends React.HTMLAttributes<HTMLLinkElement>,
    VariantProps<typeof buttonClasses> {
}

const ButtonLink: FC<ButtonLinkProps> = ({
                                   children,
                                   className,
                                   intent,
                                   size,
                                   ...props
                                 }) => {
  return (
    <Link className={buttonClasses({intent, size, className})} {...props}>
      {children}
    </Link>
  );
};

export default ButtonLink;