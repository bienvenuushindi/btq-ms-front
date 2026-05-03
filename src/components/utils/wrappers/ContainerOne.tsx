import React from 'react';

const ContainerOne = ({ children }:{
  children: React.ReactNode
}) => {
  return (
    <div className="container mx-auto flex h-full w-full flex-col items-start py-2">
      {children}
    </div>
  );
};

export default ContainerOne;
