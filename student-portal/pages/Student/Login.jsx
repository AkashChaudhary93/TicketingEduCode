import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Hash, Lock, ArrowRight, KeyRound, X, AlertCircle, Eye, EyeOff, Terminal } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/ui/Card';
import { theme } from '../../../shared/styles/theme';
import { useAuth } from '../../../shared/context/AuthContext';

const StudentLogin = () => {
    const navigate = useNavigate();
    const { login, resetPassword } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Forgot Password Modal State
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [resetRegNo, setResetRegNo] = useState('');
    const [resetStatus, setResetStatus] = useState({ message: '', success: false });
    const [isResetting, setIsResetting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(credentials.identifier, credentials.password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsResetting(true);
        setResetStatus({ message: '', success: false });

        const result = await resetPassword(resetRegNo);
        setResetStatus({ message: result.message, success: result.success });
        setIsResetting(false);
    };

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
    };

    const glassCardStyle = {
        maxWidth: '420px',
        width: '100%',
        background: 'rgba(20, 20, 30, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(99, 102, 241, 0.15)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        zIndex: 10,
        overflow: 'hidden',
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 16px 14px 44px',
        background: 'rgba(30, 30, 45, 0.8)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
    };

    const modalOverlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    };

    return (
        <div style={containerStyle}>
            {/* Gradient orbs */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)', filter: 'blur(50px)' }} />
            <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />

            {/* Forgot Password Modal */}
            {showForgotModal && (
                <div style={modalOverlay} onClick={() => setShowForgotModal(false)}>
                    <div style={{ ...glassCardStyle, maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setShowForgotModal(false)}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'rgba(148, 163, 184, 0.6)', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>
                        <div style={{ padding: '40px 32px', textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <KeyRound size={28} color={theme.colors.primary} />
                            </div>
                            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Reset Password</h2>
                            <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '14px', marginBottom: '24px' }}>Enter your Registration Number</p>

                            <form onSubmit={handleResetPassword}>
                                {resetStatus.message && (
                                    <div style={{
                                        padding: '12px',
                                        borderRadius: '10px',
                                        background: resetStatus.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: resetStatus.success ? '#10b981' : '#ef4444',
                                        fontSize: '13px',
                                        marginBottom: '16px'
                                    }}>
                                        {resetStatus.message}
                                    </div>
                                )}
                                <div style={{ position: 'relative', marginBottom: '16px' }}>
                                    <Hash size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.6)' }} />
                                    <input
                                        type="text"
                                        placeholder="Registration Number"
                                        style={inputStyle}
                                        value={resetRegNo}
                                        onChange={(e) => setResetRegNo(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isResetting}
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isResetting ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div style={glassCardStyle}>
                {/* Header */}
                <div style={{ padding: '40px 32px 0', textAlign: 'center' }}>
                    <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)' }}>
                        <LogIn size={32} color="#fff" />
                    </div>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Welcome Back</h1>
                    <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '14px' }}>Sign in with your Registration Number</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin}>
                    <div style={{ padding: '32px' }}>
                        {error && (
                            <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}

                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ position: 'relative' }}>
                                <Hash size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.6)' }} />
                                <input
                                    type="text"
                                    placeholder="Registration Number"
                                    style={inputStyle}
                                    value={credentials.identifier}
                                    onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.6)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    style={{ ...inputStyle, paddingRight: '44px' }}
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(148, 163, 184, 0.5)', cursor: 'pointer', padding: 0 }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', marginBottom: '24px' }}>
                            <button
                                type="button"
                                onClick={() => { setShowForgotModal(true); setResetStatus({ message: '', success: false }); }}
                                style={{ background: 'none', border: 'none', color: theme.colors.primary, fontSize: '13px', cursor: 'pointer' }}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                            }}
                        >
                            {isLoading ? 'Signing in...' : (
                                <>Sign In <ArrowRight size={18} /></>
                            )}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'rgba(148, 163, 184, 0.7)' }}>
                            Don't have an account?{' '}
                            <span
                                onClick={() => navigate('/signup')}
                                style={{ color: theme.colors.primary, cursor: 'pointer', fontWeight: '600' }}
                            >
                                Create one
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
