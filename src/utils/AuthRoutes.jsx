// src/utils/AuthRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export const ProtectedRoute = ({ children, allowedRole }) => {
    const { token, role } = useAuth();

    if (!token) return <Navigate to={`/${allowedRole}/login`} />;
    if (role !== allowedRole) return <Navigate to={`/${role}/dashboard`} />;

    return children;
};
export const PublicRoute = ({ children, role }) => {
    const { token, role: storedRole } = useAuth();

    if (token && storedRole === role) return <Navigate to={`/${role}/dashboard`} />;
    if (token && storedRole !== role) return <Navigate to={`/${storedRole}/dashboard`} />;

    return children;
};
