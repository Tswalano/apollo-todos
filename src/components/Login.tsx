import { Button, Card, Input } from '@nextui-org/react';
import React, { useState, FormEvent } from 'react';

type Props = {
    onLogin: (credentials: { email: string; password: string }) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLogin({ email, password });
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
                <Button type="submit" color="primary">
                    Login
                </Button>
            </form>
        </Card>
    );
};

export default Login