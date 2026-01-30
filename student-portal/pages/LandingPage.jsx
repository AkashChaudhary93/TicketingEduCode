import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Shield, Zap, Terminal, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';
import { theme } from '../../shared/styles/theme';
import { useAuth } from '../../shared/context/AuthContext';

const LandingPage = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)',
        color: '#fff',
        fontFamily: theme.font.sans,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
    };

    const navStyle = {
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
    };

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '22px',
        fontWeight: '800',
        color: '#fff',
        textDecoration: 'none',
    };

    const heroStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px 60px',
        position: 'relative',
        zIndex: 1,
    };

    const badgeStyle = {
        padding: '10px 20px',
        borderRadius: '100px',
        background: 'rgba(99, 102, 241, 0.08)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        color: theme.colors.primary,
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '32px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
    };

    const titleStyle = {
        fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
        fontWeight: '800',
        lineHeight: 1.1,
        marginBottom: '28px',
        background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        maxWidth: '900px',
        letterSpacing: '-1px',
    };

    return (
        <div style={containerStyle}>
            {/* Gradient orbs */}
            <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', bottom: '-150px', left: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 50%)', filter: 'blur(100px)' }} />

            {/* Nav */}
            <nav style={navStyle}>
                <Link to="/" style={logoStyle}>
                    <div style={{ padding: '10px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)' }}>
                        <Terminal size={22} color="#fff" />
                    </div>
                    <span>EduCode<span style={{ color: theme.colors.primary }}>.</span></span>
                </Link>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <Link to="/courses" style={{ color: 'rgba(148, 163, 184, 0.9)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Courses</Link>

                    {currentUser ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Link
                                to="/profile"
                                style={{
                                    color: '#fff',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    padding: '10px 18px',
                                    borderRadius: '10px',
                                    background: 'rgba(99, 102, 241, 0.12)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)',
                                }}
                            >
                                Hi, {(currentUser.name || currentUser.displayName || 'Learner').split(' ')[0]}
                            </Link>
                            <button
                                onClick={logout}
                                style={{
                                    padding: '10px 18px',
                                    background: 'transparent',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '10px',
                                    color: 'rgba(148, 163, 184, 0.9)',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                }}
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <button
                                onClick={() => navigate('/login')}
                                style={{ background: 'none', border: 'none', color: 'rgba(148, 163, 184, 0.9)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                style={{
                                    padding: '10px 20px',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: '#fff',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/student/support')}
                        style={{
                            padding: '10px 20px',
                            background: 'transparent',
                            border: '1px solid rgba(99, 102, 241, 0.4)',
                            borderRadius: '10px',
                            color: theme.colors.primary,
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        Get Support
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={heroStyle}>
                <div style={badgeStyle}>
                    <Sparkles size={14} /> The Future of Ed-Tech Learning
                </div>
                <h1 style={titleStyle}>
                    Master Modern Skills<br />
                    <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>With EduCode</span>
                </h1>
                <p style={{ fontSize: '18px', color: 'rgba(148, 163, 184, 0.8)', maxWidth: '550px', marginBottom: '44px', lineHeight: 1.7 }}>
                    Advanced learning platform with 24/7 support. We're here to help you succeed every step of the way.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate('/student/support')}
                        style={{
                            padding: '18px 36px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            border: 'none',
                            borderRadius: '14px',
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.35)',
                        }}
                    >
                        Get Support Now <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => navigate('/courses')}
                        style={{
                            padding: '18px 36px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '14px',
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <BookOpen size={18} /> View Courses
                    </button>
                </div>

                {/* Feature Grid */}
                <div style={{
                    marginTop: '80px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    maxWidth: '1000px',
                    width: '100%'
                }}>
                    <FeatureCard
                        icon={<MessageSquare size={24} />}
                        iconBg="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                        title="24/7 Support"
                        desc="Instant resolution for your technical and course queries."
                    />
                    <FeatureCard
                        icon={<Zap size={24} />}
                        iconBg="linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
                        title="Hyper-Fast"
                        desc="Optimized platform for smooth downloading and testing."
                    />
                    <FeatureCard
                        icon={<Shield size={24} />}
                        iconBg="linear-gradient(135deg, #10b981 0%, #06b6d4 100%)"
                        title="Secure Portal"
                        desc="Your data is protected with industry-standard encryption."
                    />
                </div>
            </section>

            {/* Footer */}
            <div style={{ padding: '32px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
                <span style={{ color: 'rgba(148, 163, 184, 0.4)', fontSize: '13px' }}>
                    © 2026 EduCode. All rights reserved.
                </span>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, iconBg, title, desc }) => (
    <div style={{
        background: 'rgba(20, 20, 30, 0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        padding: '28px',
        textAlign: 'left',
    }}>
        <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            color: '#fff'
        }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '17px', fontWeight: '600', marginBottom: '10px', color: '#fff' }}>{title}</h3>
        <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
);

export default LandingPage;
