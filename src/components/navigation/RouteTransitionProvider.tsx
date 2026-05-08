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
      <div className="w-[min(92vw,30rem)] rounded-[32px] border border-white/60 bg-white px-8 py-10 text-center shadow-[0_28px_60px_rgba(15,23,42,0.18)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-primary text-white shadow-[0_18px_34px_rgba(255,122,53,0.28)]">
          <Image src={BRAND_LOGO} alt={BRAND_NAME} width={64} height={64} className="h-16 w-16 rounded-[22px] object-cover" />
        </div>
        <h2 className="mt-6 font-display text-4xl font-bold text-slate-900">{BRAND_NAME}</h2>
        <p className="mt-3 text-lg font-medium text-slate-700">{message}</p>
        <div className="mx-auto mt-6 h-2.5 w-40 overflow-hidden rounded-full bg-slate-200">
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
