// hooks/useAuthentication.js
import { createContext, useEffect, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { API_URL, authFetcher } from '@/lib/api';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    // const { data } = useSWRImmutable(API_URL + '/check-auth', authFetcher);
    //
    // useEffect(() => {
    //     const checkAuth = () => {
    //         if (data) {
    //             setIsAuthenticated(data.authenticated);
    //         } else {
    //             setIsAuthenticated(false);
    //         }
    //     };
    //
    //     // Only check authentication if the status is not already set
    //     if (isAuthenticated === null) {
    //         checkAuth();
    //     }
    // }, [data, isAuthenticated]);

    return isAuthenticated;
};

export default useAuth;
