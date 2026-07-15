'use client';

import React, {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import Image from 'next/image';
import {BRAND_LOGO, BRAND_NAME} from '@/lib/brand';

type RouteTransitionContextValue = {
  isNavigating: boolean;
  startNavigation: (message?: string) => void;
  stopNavigation: () => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

function RouteTransitionOverlay({message}: {message: string}) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/30 backdrop-blur-sm">
      <div className="w-[min(92vw,30rem)] rounded-2xl border border-white/60 bg-white px-5 py-7 text-center shadow-[0_20px_44px_rgba(15,23,42,0.16)] sm:rounded-[32px] sm:px-8 sm:py-10 sm:shadow-[0_28px_60px_rgba(15,23,42,0.18)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_18px_34px_rgba(255,122,53,0.28)] sm:h-16 sm:w-16 sm:rounded-[22px]">
          <Image src={BRAND_LOGO} alt={BRAND_NAME} width={64} height={64} className="h-12 w-12 rounded-2xl object-cover sm:h-16 sm:w-16 sm:rounded-[22px]" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold text-slate-900 sm:mt-6 sm:text-4xl">{BRAND_NAME}</h2>
        <p className="mt-2 text-sm font-medium text-slate-700 sm:mt-3 sm:text-lg">{message}</p>
        <div className="mx-auto mt-5 h-2 w-32 overflow-hidden rounded-full bg-slate-200 sm:mt-6 sm:h-2.5 sm:w-40">
          <div className="h-full w-1/2 animate-[pulse_1.1s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}

export default function RouteTransitionProvider({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [message, setMessage] = useState('Loading next page...');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopNavigation = useCallback(() => {
    setIsNavigating(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startNavigation = useCallback((nextMessage = 'Loading next page...') => {
    setMessage(nextMessage);
    setIsNavigating(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
      timeoutRef.current = null;
    }, 12000);
  }, []);

  useEffect(() => {
    stopNavigation();
  }, [pathname, searchParams, stopNavigation]);

  const value = useMemo(
    () => ({
      isNavigating,
      startNavigation,
      stopNavigation
    }),
    [isNavigating, startNavigation, stopNavigation]
  );

  return (
    <RouteTransitionContext.Provider value={value}>
      {children}
      {isNavigating && <RouteTransitionOverlay message={message} />}
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  const context = useContext(RouteTransitionContext);

  if (!context) {
    throw new Error('useRouteTransition must be used within RouteTransitionProvider');
  }

  return context;
}
