import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Send, CheckCircle2, ArrowLeft, MessageSquare, AlertCircle, HelpCircle, Star, PlusCircle, Terminal, Download, FileQuestion, Sparkles, ArrowRight } from 'lucide-react';
import { useQueries } from '../../../shared/context/QueryContext';
import { useAuth } from '../../../shared/context/AuthContext';
import { theme } from '../../../shared/styles/theme';

const predefinedOptions = [
    { id: 'download-issue', label: 'Problem downloading / running app', icon: Download, category: 'Technical', gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' },
    { id: 'test-error', label: 'Error while giving test / data issues', icon: AlertCircle, category: 'Test Support', gradient: 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)' },
    { id: 'feedback', label: 'Platform Feedback', icon: Star, category: 'Feedback', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' },
    { id: 'general-query', label: 'General Course Inquiry', icon: HelpCircle, category: 'Inquiry', gradient: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)' },
];

const SubmitQuery = () => {
    const navigate = useNavigate();
    const { addQuery } = useQueries();
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        regNo: '',
        email: '',
        whatsapp: '',
        category: 'General',
        subject: '',
        description: ''
    });

    React.useEffect(() => {
        if (currentUser) {
            setFormData(prev => ({
                ...prev,
                name: currentUser.name || '',
                regNo: currentUser.regNumber || '',
                email: currentUser.email || '',
                whatsapp: currentUser.whatsapp || '',
            }));
        }
    }, [currentUser]);

    const [activeTab, setActiveTab] = useState('predefined');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addQuery(formData);
            setSuccess(true);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit query. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSelectPredefined = (option) => {
        setFormData({
            ...formData,
            category: option.category,
            subject: option.label,
            description: `Student reporting: ${option.label}`
        });
        setActiveTab('unique');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 16px',
        background: 'rgba(30, 30, 45, 0.8)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
    };

    const readOnlyInputStyle = {
        ...inputStyle,
        background: 'rgba(20, 20, 30, 0.6)',
        cursor: 'not-allowed',
        opacity: 0.8,
    };

    const labelStyle = {
        display: 'block',
        fontSize: '11px',
        fontWeight: '600',
        color: 'rgba(148, 163, 184, 0.7)',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    };

    if (success) {
        return (
            <div style={containerStyle}>
                <div style={{ position: 'absolute', top: '-150px', right: '-150px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                    <div style={{
                        maxWidth: '420px',
                        width: '100%',
                        background: 'rgba(20, 20, 30, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '24px',
                        padding: '48px 40px',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 28px',
                            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.35)',
                        }}>
                            <CheckCircle2 size={40} color="#fff" />
                        </div>
                        <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Query Submitted!</h2>
                        <p style={{ color: 'rgba(148, 163, 184, 0.8)', marginBottom: '32px', lineHeight: 1.7, fontSize: '15px' }}>
                            Our team will contact you via WhatsApp or Email shortly.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                            }}
                        >
                            Back to Home <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            {/* Gradient orbs */}
            <div style={{ position: 'absolute', top: '-150px', right: '-150px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

            {/* Header */}
            <nav style={{
                padding: '20px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div style={{ padding: '10px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}>
                        <Terminal size={20} color="#fff" />
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>EduCode<span style={{ color: theme.colors.primary }}>.</span></span>
                </Link>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        color: 'rgba(148, 163, 184, 0.9)',
                        fontSize: '13px',
                        cursor: 'pointer',
                    }}
                >
                    <ArrowLeft size={16} /> Back to Home
                </button>
            </nav>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 24px' }}>
                <div style={{
                    maxWidth: '800px',
                    width: '100%',
                    background: 'rgba(20, 20, 30, 0.5)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                }}>
                    {/* Header */}
                    <div style={{ padding: '32px 36px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <Sparkles size={18} color={theme.colors.primary} />
                            <span style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.primary, letterSpacing: '0.5px' }}>SUPPORT CENTER</span>
                        </div>
                        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>How can we help?</h1>
                        <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '15px', margin: 0 }}>
                            Submit your query and our team will assist you promptly.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', margin: '0 36px' }}>
                        <div
                            onClick={() => setActiveTab('predefined')}
                            style={{
                                flex: 1,
                                padding: '14px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '14px',
                                color: activeTab === 'predefined' ? theme.colors.primary : 'rgba(148, 163, 184, 0.6)',
                                borderBottom: activeTab === 'predefined' ? `2px solid ${theme.colors.primary}` : '2px solid transparent',
                                background: activeTab === 'predefined' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                            }}
                        >
                            Quick Select
                        </div>
                        <div
                            onClick={() => setActiveTab('unique')}
                            style={{
                                flex: 1,
                                padding: '14px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '14px',
                                color: activeTab === 'unique' ? theme.colors.primary : 'rgba(148, 163, 184, 0.6)',
                                borderBottom: activeTab === 'unique' ? `2px solid ${theme.colors.primary}` : '2px solid transparent',
                                background: activeTab === 'unique' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                            }}
                        >
                            Custom Query
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ padding: '28px 36px' }}>
                            {/* User Info Card */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '16px',
                                padding: '20px',
                                background: 'rgba(99, 102, 241, 0.05)',
                                border: '1px solid rgba(99, 102, 241, 0.15)',
                                borderRadius: '16px',
                                marginBottom: '28px',
                            }}>
                                <div>
                                    <label style={labelStyle}>Logged in as</label>
                                    <input type="text" value={formData.name || 'Guest'} readOnly style={readOnlyInputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Reg. Number</label>
                                    <input type="text" value={formData.regNo || 'Not set'} readOnly style={readOnlyInputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>WhatsApp</label>
                                    <input type="text" value={formData.whatsapp || 'Not set'} readOnly style={readOnlyInputStyle} />
                                </div>
                            </div>

                            {activeTab === 'predefined' ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                    {predefinedOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            onClick={() => handleSelectPredefined(option)}
                                            style={{
                                                padding: '24px',
                                                borderRadius: '16px',
                                                background: 'rgba(30, 30, 45, 0.5)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '16px',
                                                transition: 'all 0.2s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(40, 40, 60, 0.6)';
                                                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(30, 30, 45, 0.5)';
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <div style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '12px',
                                                background: option.gradient,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                <option.icon size={22} color="#fff" />
                                            </div>
                                            <div>
                                                <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: '0 0 6px' }}>{option.label}</h4>
                                                <p style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '12px', margin: 0 }}>{option.category}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '14px 18px',
                                        background: 'rgba(99, 102, 241, 0.08)',
                                        borderRadius: '12px',
                                        marginBottom: '8px',
                                    }}>
                                        <PlusCircle size={18} color={theme.colors.primary} />
                                        <span style={{ fontSize: '14px', color: theme.colors.primary, fontWeight: '600' }}>Creating a custom query</span>
                                    </div>

                                    <div>
                                        <label style={labelStyle}>Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            style={{
                                                ...inputStyle,
                                                height: '48px',
                                                appearance: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <option value="General" style={{ background: '#1a1a2e' }}>Other / Custom</option>
                                            <option value="Downloading" style={{ background: '#1a1a2e' }}>Downloading / Installation</option>
                                            <option value="Test Error" style={{ background: '#1a1a2e' }}>Test / Data Error</option>
                                            <option value="Course Content" style={{ background: '#1a1a2e' }}>Course Content Issues</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={labelStyle}>Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            placeholder="Brief title for your query"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            style={inputStyle}
                                        />
                                    </div>

                                    <div>
                                        <label style={labelStyle}>Description</label>
                                        <textarea
                                            name="description"
                                            required
                                            placeholder="Provide details so we can assist you better..."
                                            value={formData.description}
                                            onChange={handleChange}
                                            style={{
                                                ...inputStyle,
                                                minHeight: '140px',
                                                resize: 'vertical',
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{
                                            padding: '16px',
                                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            opacity: isSubmitting ? 0.7 : 1,
                                            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                                            marginTop: '8px',
                                        }}
                                    >
                                        {isSubmitting ? 'Submitting...' : (
                                            <>Submit Query <Send size={18} /></>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer - NO admin link */}
            <div style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
                <span style={{ color: 'rgba(148, 163, 184, 0.4)', fontSize: '12px' }}>
                    © 2026 EduCode. All rights reserved.
                </span>
            </div>
        </div>
    );
};

export default SubmitQuery;
