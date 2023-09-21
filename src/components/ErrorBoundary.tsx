import React from 'react';

const ErrorBoundary = ({ error, children }) => {
  return (
    <div>
      {error ? <div>Failed to load</div> : children}
    </div>
  );
};

export default ErrorBoundary;
