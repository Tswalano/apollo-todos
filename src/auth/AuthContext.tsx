import React, { createContext, useContext, useEffect, useState } from 'react';
import { SignUpModel } from '../utils';

interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    userData: SignUpModel | undefined;
    login: (token: string, user: SignUpModel) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<any>(null);
    const [userData, setUserData] = useState<SignUpModel>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setIsAuthenticated(true);
            setToken(storedToken);
        }
        setIsLoading(false);
    }, [isAuthenticated]);

    const login = (token: string, user: SignUpModel) => {
        setIsAuthenticated(true);
        setToken(token)
        setUserData(user)
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(undefined);
        setUserData(undefined)
        localStorage.removeItem('authToken');
    };

    const authContextValue: AuthContextProps = {
        isAuthenticated,
        token,
        login,
        userData,
        logout,
    };

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
