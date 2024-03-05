import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <NavbarComponent />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {children}
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;
