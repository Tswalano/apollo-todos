import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage: React.FC = () => {
    const handleSignup = (credentials: { email: string; password: string }) => {
        // Implement signup logic here
        console.log('Signup submitted:', credentials);
    };

    return (
        <div>
            <h1>Signup Page</h1>
            <SignupForm onSignup={handleSignup} />
        </div>
    );
};

export default SignupPage;
