import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from '../utils/routes/routes';
import Welcome from '../components/Welcome';
import { useAuth } from '../auth/AuthContext';

const PrivateRoutes: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        logout();
        return <Navigate to={routes.LOGIN_PAGE} />;
    }

    return (
        <Routes>
            <Route path={routes.DASHBORD} element={<Welcome />} />
            {/* Add other private routes as needed */}
        </Routes>
    );
};

export default PrivateRoutes;
