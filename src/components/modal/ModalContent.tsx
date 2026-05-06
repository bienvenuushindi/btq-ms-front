import React from 'react';

export default function ModalContent({children}:{
  children: React.ReactNode
}){
  return (
    <div className="relative z-50 my-auto w-full max-w-3xl">
      <div className="relative flex max-h-[calc(100vh-3rem)] flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_28px_64px_rgba(15,23,42,0.18)] md:max-h-[calc(100vh-5rem)]">
      {children}
      </div>
    </div>
  );
}
