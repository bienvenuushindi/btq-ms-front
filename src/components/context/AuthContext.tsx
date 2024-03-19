'use client'

import {createContext} from 'react';
import useAuth from "@/app/hooks/useAuth";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const isAuthenticated = useAuth();
    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};