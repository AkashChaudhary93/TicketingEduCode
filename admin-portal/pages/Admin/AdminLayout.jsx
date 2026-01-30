import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Inbox, Users, Settings, LogOut, Terminal, Bell } from 'lucide-react';
import { theme } from '../../../shared/styles/theme';
import { useAuth } from '../../../shared/context/AuthContext';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();

    const sidebarStyle = {
        width: '260px',
        backgroundColor: '#0a0d14',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 50,
    };

    const mainStyle = {
        marginLeft: '260px',
        minHeight: '100vh',
        backgroundColor: '#05070a',
        padding: '32px',
        color: '#fff',
    };

    const navItemStyle = (path) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        borderRadius: '10px',
        color: location.pathname === path ? '#fff' : theme.colors.muted,
        backgroundColor: location.pathname === path ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
        textDecoration: 'none',
        marginBottom: '4px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
    });

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <div style={sidebarStyle}>
                <div style={{ padding: '32px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '18px', fontWeight: '800' }}>
                        <div style={{ padding: '6px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                            <Terminal size={18} color="#fff" />
                        </div>
                        EDUCODE<span style={{ color: theme.colors.primary }}>.</span>
                    </div>
                    <div style={{ marginTop: '4px', fontSize: '10px', color: theme.colors.muted, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Admin Workspace
                    </div>
                </div>

                <div style={{ flex: 1, padding: '0 12px' }}>
                    <div style={navItemStyle('/dashboard')} onClick={() => navigate('/dashboard')}>
                        <LayoutDashboard size={18} /> Dashboard
                    </div>
                    <div style={navItemStyle('/queries')} onClick={() => navigate('/queries')}>
                        <Inbox size={18} /> Query Inbox
                    </div>
                    <div style={navItemStyle('/users')} onClick={() => navigate('/users')}>
                        <Users size={18} /> User Management
                    </div>
                    <div style={navItemStyle('/settings')} onClick={() => { }}>
                        <Settings size={18} /> Settings
                    </div>
                </div>

                <div style={{ padding: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ ...navItemStyle('/'), marginBottom: 0 }} onClick={() => { logout(); window.location.href = '/'; }}>
                        <LogOut size={18} /> Sign Out
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={mainStyle}>
                <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button style={{ background: 'none', border: 'none', color: theme.colors.muted, cursor: 'pointer', position: 'relative' }}>
                            <Bell size={20} />
                            <div style={{ position: 'absolute', top: -4, right: -4, width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid #05070a' }} />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', fontSize: '13px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                {currentUser?.name?.[0] || 'A'}
                            </div>
                            <span>{currentUser?.name || 'Administrator'}</span>
                        </div>
                    </div>
                </header>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
