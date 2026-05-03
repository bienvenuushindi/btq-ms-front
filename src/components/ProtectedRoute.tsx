'use client'
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";
import DataLoading from "@/components/state/Loading";
const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const { data, isLoading } = useFetcher(API_ENDPOINTS.CHECK_AUTH);

    useEffect(() => {
        const checkAuth = () => {
            if(!isLoading){
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

    if (isLoading || isAuthenticated === null) {
        return <DataLoading />;
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
