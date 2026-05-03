'use client';

import Link, {LinkProps} from 'next/link';
import React from 'react';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';

type TransitionLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    loadingMessage?: string;
  };

export default function TransitionLink({
  children,
  onClick,
  loadingMessage,
  ...props
}: TransitionLinkProps) {
  const {startNavigation} = useRouteTransition();

  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          startNavigation(loadingMessage);
        }
      }}
    >
      {children}
    </Link>
  );
}
