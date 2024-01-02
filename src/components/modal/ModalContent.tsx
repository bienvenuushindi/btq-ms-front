import Button from '@/components/Button';
import React from 'react';

export default function ModalContent({children}:{
  children: React.ReactNode
}){
  return (
    <div className="relative w-full max-w-3xl max-h-full z-50">
      <div className="relative bg-white rounded-lg shadow z-50">
      {children}
      </div>
    </div>
  );
}