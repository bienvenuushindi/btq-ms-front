import React from 'react';

const ContainerOne = ({ children }:{
  children: React.ReactNode
}) => {
  return (
    <div className="w-full h-full container mx-auto py-4 flex flex-col items-start">
      {children}
    </div>
  );
};

export default ContainerOne;
