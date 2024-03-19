'use client'
// components/ProtectedRoute.js
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import useAuth from "@/app/hooks/useAuth";
import useSWRImmutable from "swr/immutable";
import {API_ENDPOINTS, API_URL, authFetcher} from "@/lib/api";
import {useFetcher} from "@/app/hooks/useFetcher";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const { data, isLoading } = useFetcher(API_ENDPOINTS.CHECK_AUTH);

    useEffect(() => {
        const checkAuth = () => {
            if(isLoading){
                if (data) {
                    setIsAuthenticated(data.authenticated);
                } else {
                    setIsAuthenticated(false);
                    router.push('/signin');
                }
            }
        };

        // Only check authentication if the status is not already set
        if (isAuthenticated === null) {
            checkAuth();
        }
    }, [data, isAuthenticated, isLoading, router]);

    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
