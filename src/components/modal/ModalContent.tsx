import React from 'react';
import clsx from 'clsx';

export default function ModalContent({children, className}:{
  children: React.ReactNode,
  className?: string
}){
  return (
    <div className={clsx("relative z-50 my-auto w-full max-w-3xl min-w-0", className)}>
      <div className="relative flex max-h-[calc(100vh-1.5rem)] min-w-0 flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_20px_44px_rgba(15,23,42,0.16)] sm:max-h-[calc(100vh-3rem)] sm:rounded-[32px] sm:shadow-[0_28px_64px_rgba(15,23,42,0.18)] md:max-h-[calc(100vh-5rem)]">
      {children}
      </div>
    </div>
  );
}
