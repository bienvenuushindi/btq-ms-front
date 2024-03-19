import React from 'react';
import ErrorBoundary from "@/components/ErrorBoundary";

const DataWrapper = ({ isLoading, error, loadingComponent, children }) => {
    return (
        <>
            {isLoading ? (
                loadingComponent
            ) : (
                <ErrorBoundary error={error}>
                    {children}
                </ErrorBoundary>
            )}
        </>
    );
};

export default DataWrapper;
