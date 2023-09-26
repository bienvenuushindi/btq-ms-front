import React from 'react';

const ErrorBoundary = ({ error, children }) => {
  return (
    <>
      {error ? <div>Failed to load</div> : children}
    </>
  );
};

export default ErrorBoundary;
