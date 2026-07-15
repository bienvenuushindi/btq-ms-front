import React from 'react';

const ErrorBoundary = ({ error, children, fallback = <div>Something went wrong</div> }: any) => {
  return (
    <>
      {error ? fallback : children}
    </>
  );
};

export default ErrorBoundary;
