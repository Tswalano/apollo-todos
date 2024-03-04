import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';

interface MainLayoutProps {
    title?: string;
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title = 'Your App' }) => {
    return (
        <div className='container w-full h-full'>
            <NavbarComponent />

            <div className="container mx-auto my-8 flex z-40 items-center justify-center">
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;
