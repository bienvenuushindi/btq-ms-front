import React from 'react';

export default function ModalContent({children}:{
  children: React.ReactNode
}){
  return (
    <div className="relative z-50 max-h-full w-full max-w-3xl px-4">
      <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_28px_64px_rgba(15,23,42,0.18)]">
      {children}
      </div>
    </div>
  );
}
