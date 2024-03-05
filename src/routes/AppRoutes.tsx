import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage } from '../auth/AuthPage';
import PrivateRoutes from './PrivateRoutes';
import Login from '../components/Login';
import Signup from '../components/Signup';
import App from '../App';
import { routes } from '../utils/routes/routes';
import { AuthProvider } from '../auth/AuthContext';



const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<App />}>
                        <Route path={routes.ALL_ERROR_PAGE} element={"Error Page"} />
                        <Route path={routes.AUTH_PAGE} element={<AuthPage />} />
                        <Route path={routes.LOGIN_PAGE} element={<Login />} />
                        <Route path={routes.SIGNUP_PAGE} element={<Signup />} />
                        <Route path={routes.DEFAULT_HOME_PAGE} element={<PrivateRoutes />} />
                        <Route index element={<Navigate to={routes.LOGIN_PAGE} replace />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export { AppRoutes }