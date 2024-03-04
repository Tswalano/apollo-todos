import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
    const handleLogin = (credentials: { email: string; password: string }) => {
        // Implement login logic here
        console.log('Login submitted:', credentials);
    };

    return (
        <div>
            <h1>Login Page</h1>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default LoginPage;
