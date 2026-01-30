import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from '../shared/context/QueryContext';
import { AuthProvider } from '../shared/context/AuthContext';
import AdminDashboard from './pages/Admin/Dashboard';
import QueryList from './pages/Admin/QueryList';
import AdminLogin from './pages/Admin/Login';
import AdminSignup from './pages/Admin/Signup';
import UserList from './pages/Admin/UserList';
import ProtectedRoute from './components/ProtectedRoute';
import { theme } from '../shared/styles/theme';

function AdminApp() {
    const adminStyle = {
        minHeight: '100vh',
        backgroundColor: '#05070a',
        color: '#fff',
        fontFamily: theme.font.sans,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
    };

    return (
        <div style={adminStyle}>
            <AuthProvider>
                <QueryProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Navigate to="/login" replace />} />
                            <Route path="/login" element={<AdminLogin />} />
                            <Route path="/signup" element={<AdminSignup />} />
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/queries" element={
                                <ProtectedRoute>
                                    <QueryList />
                                </ProtectedRoute>
                            } />
                            <Route path="/users" element={
                                <ProtectedRoute>
                                    <UserList />
                                </ProtectedRoute>
                            } />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                    </Router>
                </QueryProvider>
            </AuthProvider>
        </div>
    );
}

export default AdminApp;

