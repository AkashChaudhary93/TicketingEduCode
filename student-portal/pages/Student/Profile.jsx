import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Hash, Phone, Save, ArrowLeft, CheckCircle, AlertCircle, Mail, Edit3 } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/ui/Card';
import { theme } from '../../../shared/styles/theme';
import { useAuth } from '../../../shared/context/AuthContext';

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, updateProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        regNumber: '',
        whatsapp: ''
    });
    const [status, setStatus] = useState({ message: '', success: false });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || currentUser.displayName || '',
                regNumber: currentUser.regNumber || '',
                whatsapp: currentUser.whatsapp || ''
            });
        }
    }, [currentUser]);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ message: '', success: false });

        const result = await updateProfile({
            name: formData.name,
            regNumber: formData.regNumber,
            whatsapp: formData.whatsapp
        });

        setStatus({ message: result.message, success: result.success });
        setIsLoading(false);
    };

    // Premium glassmorphism styles
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
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(20, 20, 30, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(99, 102, 241, 0.15)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        zIndex: 10,
        overflow: 'hidden',
    };

    const avatarRingStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #6366f1 100%)',
        padding: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const avatarInnerStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const inputWrapperStyle = {
        position: 'relative',
        marginBottom: '4px',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '11px',
        fontWeight: '600',
        color: 'rgba(148, 163, 184, 0.8)',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
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
        transition: 'all 0.3s ease',
    };

    const iconStyle = {
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'rgba(99, 102, 241, 0.6)',
    };

    const editIconStyle = {
        position: 'absolute',
        right: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'rgba(148, 163, 184, 0.4)',
    };

    const hintStyle = {
        fontSize: '11px',
        color: theme.colors.primary,
        marginTop: '6px',
        opacity: 0.8,
    };

    if (!currentUser) {
        return (
            <div style={containerStyle}>
                <div style={glassCardStyle}>
                    <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                        <AlertCircle size={56} color="#ef4444" style={{ marginBottom: '20px' }} />
                        <h2 style={{ color: '#fff', marginBottom: '8px', fontSize: '22px' }}>Not Logged In</h2>
                        <p style={{ color: 'rgba(148, 163, 184, 0.8)', marginBottom: '28px', fontSize: '14px' }}>Please login to view your profile.</p>
                        <Button onClick={() => navigate('/login')} style={{ padding: '12px 32px' }}>Go to Login</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            {/* Gradient orbs */}
            <div style={{ position: 'absolute', top: '-150px', right: '-150px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />

            <div style={glassCardStyle}>
                {/* Header */}
                <div style={{ padding: '28px 32px 0' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'rgba(148, 163, 184, 0.7)', cursor: 'pointer', fontSize: '13px', marginBottom: '24px', transition: 'color 0.2s' }}
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '8px' }}>
                        <div style={avatarRingStyle}>
                            <div style={avatarInnerStyle}>
                                <User size={32} color="rgba(99, 102, 241, 0.8)" />
                            </div>
                        </div>
                        <div>
                            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', margin: 0 }}>Profile Settings</h1>
                            <p style={{ color: 'rgba(148, 163, 184, 0.7)', margin: '4px 0 0', fontSize: '14px' }}>Update your account details</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSave}>
                    <div style={{ padding: '28px 32px' }}>
                        {status.message && (
                            <div style={{
                                padding: '14px 18px',
                                borderRadius: '12px',
                                background: status.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                border: `1px solid ${status.success ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                                color: status.success ? '#10b981' : '#ef4444',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '24px'
                            }}>
                                {status.success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                {status.message}
                            </div>
                        )}

                        {/* Email - Read Only */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={labelStyle}>Email Address</label>
                            <div style={inputWrapperStyle}>
                                <Mail size={18} style={iconStyle} />
                                <input
                                    type="text"
                                    value={currentUser.email || ''}
                                    style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }}
                                    disabled
                                />
                            </div>
                            <p style={{ fontSize: '11px', color: 'rgba(148, 163, 184, 0.5)', marginTop: '6px' }}>Email cannot be changed</p>
                        </div>

                        {/* Full Name */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={labelStyle}>Full Name</label>
                            <div style={inputWrapperStyle}>
                                <User size={18} style={iconStyle} />
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    style={inputStyle}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <Edit3 size={14} style={editIconStyle} />
                            </div>
                        </div>

                        {/* Registration Number */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={labelStyle}>Registration Number</label>
                            <div style={inputWrapperStyle}>
                                <Hash size={18} style={iconStyle} />
                                <input
                                    type="text"
                                    placeholder="e.g. 2024-CS-001"
                                    style={inputStyle}
                                    value={formData.regNumber}
                                    onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                                />
                                <Edit3 size={14} style={editIconStyle} />
                            </div>
                            <p style={hintStyle}>Required for support ticket submissions</p>
                        </div>

                        {/* WhatsApp */}
                        <div style={{ marginBottom: '28px' }}>
                            <label style={labelStyle}>WhatsApp Number</label>
                            <div style={inputWrapperStyle}>
                                <Phone size={18} style={iconStyle} />
                                <input
                                    type="text"
                                    placeholder="e.g. +91 9876543210"
                                    style={inputStyle}
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                                <Edit3 size={14} style={editIconStyle} />
                            </div>
                            <p style={hintStyle}>For instant support notifications</p>
                        </div>

                        {/* Save Button */}
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
                                opacity: isLoading ? 0.7 : 1,
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                            }}
                        >
                            {isLoading ? 'Saving Changes...' : (
                                <>
                                    <Save size={18} /> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
