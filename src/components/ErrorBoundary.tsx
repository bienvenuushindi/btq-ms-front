import React from 'react';

const ErrorBoundary = ({ error, children }: any) => {
  return (
    <>
      {error ? <div>Something went wrong</div> : children}
    </>
  );
};

export default ErrorBoundary;
