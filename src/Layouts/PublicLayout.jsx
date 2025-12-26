import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/public/PublicNavbar';
import PublicFooter from '../components/public/PublicFooter';

const PublicLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-white">
            <PublicNavbar />
            <main className="flex-grow-1" style={{ paddingTop: '76px' }}>
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;
