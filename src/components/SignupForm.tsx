import React, { useState, FormEvent } from 'react';
import { Card, Input, Button } from '@nextui-org/react';

interface SignupFormProps {
    onSignup: (credentials: { email: string; password: string }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSignup({ email, password });
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" color="success">
                    Signup
                </Button>
            </form>
        </Card>
    );
};

export default SignupForm;
