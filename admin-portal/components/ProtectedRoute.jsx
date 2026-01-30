import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { theme } from '../../shared/styles/theme';

/**
 * ProtectedRoute - Guards admin routes
 * 
 * Security Checks:
 * 1. User must be authenticated
 * 2. User must have 'teacher' role
 * 
 * If checks fail, redirects to login page.
 */
const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    // Not logged in - redirect to login
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but not an admin - show access denied
    if (currentUser.role !== 'teacher') {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#05070a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: theme.font.sans,
                color: '#fff',
                padding: '24px',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '400px',
                    padding: '40px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '16px'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#ef4444' }}>
                        Access Denied
                    </h2>
                    <p style={{ color: theme.colors.muted, marginBottom: '24px' }}>
                        You do not have administrative privileges to access this area.
                        Please contact your system administrator.
                    </p>
                    <a
                        href="/"
                        style={{
                            color: theme.colors.primary,
                            textDecoration: 'underline',
                            fontWeight: '600'
                        }}
                    >
                        Return to Login
                    </a>
                </div>
            </div>
        );
    }

    // User is authenticated and is an admin - allow access
    return children;
};

export default ProtectedRoute;
