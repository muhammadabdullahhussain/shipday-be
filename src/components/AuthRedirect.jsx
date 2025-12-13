import { Navigate } from 'react-router-dom';

const AuthRedirect = () => {
    const token = localStorage.getItem('token');

    // If user is logged in, redirect to dashboard
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    // Otherwise, redirect to login
    return <Navigate to="/login" replace />;
};

export default AuthRedirect;
