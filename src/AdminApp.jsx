import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from './context/QueryContext';
import AdminDashboard from './pages/Admin/Dashboard';
import QueryList from './pages/Admin/QueryList';
import AdminLogin from './pages/Admin/Login';
import { theme } from './styles/theme';

function AdminApp() {
    const adminStyle = {
        minHeight: '100vh',
        backgroundColor: '#05070a', // Dark Admin background
        color: '#fff',
        fontFamily: theme.font.sans,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
    };

    return (
        <div style={adminStyle}>
            <QueryProvider>
                <Router>
                    <Routes>
                        {/* Admin Specific Routes */}
                        <Route path="/admin.html" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<AdminLogin />} />
                        <Route path="/dashboard" element={<AdminDashboard />} />
                        <Route path="/queries" element={<QueryList />} />
                        {/* Fallback to login in the admin domain */}
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </Router>
            </QueryProvider>
        </div>
    );
}

export default AdminApp;
