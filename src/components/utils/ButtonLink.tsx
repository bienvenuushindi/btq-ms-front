import React, {FC} from 'react';
import {VariantProps} from 'class-variance-authority';
import {buttonClasses} from '@/components/utils/Button';
import TransitionLink from '@/components/navigation/TransitionLink';

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
  const href = typeof props.href === 'string' ? props.href : '';
  const loadingMessage =
    href.includes('/create')
      ? 'Opening create form...'
      : href.includes('/update')
        ? 'Opening update form...'
        : 'Loading page...';

  return (
    <TransitionLink
      className={buttonClasses({intent, size, className})}
      loadingMessage={loadingMessage}
      {...props}
    >
      {children}
    </TransitionLink>
  );
};

export default ButtonLink;
