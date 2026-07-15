import React from 'react';

const ContainerOne = ({ children }:{
  children: React.ReactNode
}) => {
  return (
    <div className="mx-auto flex h-full w-full min-w-0 max-w-screen-2xl flex-col items-start py-2">
      {children}
    </div>
  );
};

export default ContainerOne;
