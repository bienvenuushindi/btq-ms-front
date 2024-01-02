import React from 'react';

const ErrorBoundary = ({ error, children }: any) => {
  return (
    <>
      {error ? <div>Failed to load</div> : children}
    </>
  );
};

export default ErrorBoundary;
