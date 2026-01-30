import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Hash, Phone, Lock, User, ArrowRight, Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { theme } from '../../../shared/styles/theme';
import { useAuth } from '../../../shared/context/AuthContext';

const StudentSignup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        regNumber: '',
        whatsapp: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        const result = await signup(
            formData.name,
            formData.regNumber,
            formData.whatsapp,
            formData.password,
            'student'
        );
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setIsLoading(false);
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
        maxWidth: '440px',
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

    return (
        <div style={containerStyle}>
            {/* Gradient orbs */}
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)', filter: 'blur(50px)' }} />
            <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />

            <div style={glassCardStyle}>
                {/* Header */}
                <div style={{ padding: '36px 32px 0', textAlign: 'center' }}>
                    <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
                        <UserPlus size={32} color="#fff" />
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Create Account</h1>
                    <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '14px' }}>Join EduCode with your university credentials</p>
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
                                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.6)' }} />
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

                        {/* Registration Number */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ position: 'relative' }}>
                                <Hash size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.6)' }} />
                                <input
                                    type="text"
                                    placeholder="University Registration Number"
                                    style={inputStyle}
                                    value={formData.regNumber}
                                    onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* WhatsApp */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.6)' }} />
                                <input
                                    type="text"
                                    placeholder="WhatsApp Number"
                                    style={inputStyle}
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.6)' }} />
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
                                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(148, 163, 184, 0.5)', cursor: 'pointer', padding: 0 }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ position: 'relative' }}>
                                <Shield size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(99, 102, 241, 0.6)' }} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    style={{ ...inputStyle, paddingRight: '44px' }}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(148, 163, 184, 0.5)', cursor: 'pointer', padding: 0 }}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
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
                                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                            }}
                        >
                            {isLoading ? 'Creating Account...' : (
                                <>Create Account <ArrowRight size={18} /></>
                            )}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'rgba(148, 163, 184, 0.7)' }}>
                            Already have an account?{' '}
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

export default StudentSignup;
