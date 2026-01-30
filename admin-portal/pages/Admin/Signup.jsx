import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { theme } from '../../../shared/styles/theme';
import { useAuth } from '../../../shared/context/AuthContext';

const AdminSignup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        inviteCode: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.inviteCode !== 'ADMIN2026') {
            setError('Invalid Administrator Invite Code');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        const result = await signup(formData.name, formData.email, null, formData.password, 'teacher');
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #05070a 0%, #0a0d12 50%, #05070a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
    };

    const glassCardStyle = {
        maxWidth: '440px',
        width: '100%',
        background: 'rgba(15, 18, 25, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(99, 102, 241, 0.12)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        zIndex: 10,
        overflow: 'hidden',
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 16px 14px 44px',
        background: 'rgba(20, 24, 35, 0.9)',
        border: '1px solid rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
    };

    return (
        <div style={containerStyle}>
            {/* Gradient orbs */}
            <div style={{ position: 'absolute', top: '-120px', left: '-120px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

            <div style={glassCardStyle}>
                {/* Header */}
                <div style={{ padding: '36px 32px 0', textAlign: 'center' }}>
                    <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 28px rgba(245, 158, 11, 0.3)' }}>
                        <ShieldAlert size={34} color="#fff" />
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Admin Enrollment</h1>
                    <p style={{ color: 'rgba(148, 163, 184, 0.65)', fontSize: '14px' }}>Register as an EduCode administrator</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignup}>
                    <div style={{ padding: '28px 32px 32px' }}>
                        {error && (
                            <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}

                        {/* Full Name */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.55)' }} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    style={inputStyle}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.55)' }} />
                                <input
                                    type="email"
                                    placeholder="Institutional Email"
                                    style={inputStyle}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.55)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create Password"
                                    style={{ ...inputStyle, paddingRight: '44px' }}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(148, 163, 184, 0.45)', cursor: 'pointer', padding: 0 }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Invite Code */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ position: 'relative' }}>
                                <ShieldCheck size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(245, 158, 11, 0.7)' }} />
                                <input
                                    type="text"
                                    placeholder="Invite Code (required)"
                                    style={{ ...inputStyle, borderColor: 'rgba(245, 158, 11, 0.25)' }}
                                    value={formData.inviteCode}
                                    onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                                    required
                                />
                            </div>
                            <p style={{ fontSize: '11px', color: 'rgba(245, 158, 11, 0.7)', marginTop: '6px' }}>Contact system administrator for invite code</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
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
                                boxShadow: '0 4px 24px rgba(245, 158, 11, 0.3)',
                            }}
                        >
                            {isLoading ? 'Creating Account...' : (
                                <>Complete Enrollment <ArrowRight size={18} /></>
                            )}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'rgba(148, 163, 184, 0.6)' }}>
                            Already enrolled?{' '}
                            <span
                                onClick={() => navigate('/login')}
                                style={{ color: theme.colors.primary, cursor: 'pointer', fontWeight: '600' }}
                            >
                                Sign in
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;
