import React, { FC } from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({ title = '', children }) => {
    return (
        <div className="max-w-md">
            {children}
        </div>
    );
};
