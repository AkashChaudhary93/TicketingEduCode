import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, Terminal, Star, Clock, Users } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared/components/ui/Card';
import { theme } from '../../shared/styles/theme';

const Courses = () => {
    const navigate = useNavigate();

    const containerStyle = {
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        color: '#fff',
        fontFamily: theme.font.sans,
        padding: '40px 24px',
    };

    const headerStyle = {
        maxWidth: '1200px',
        margin: '0 auto 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    };

    const gridStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '32px',
    };

    const courseCardStyle = {
        background: 'rgba(26, 31, 46, 0.6)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'transform 0.3s ease, border-color 0.3s ease',
        cursor: 'pointer',
        overflow: 'hidden',
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <Button variant="ghost" onClick={() => navigate('/')} style={{ width: 'fit-content', padding: 0, color: theme.colors.muted }}>
                    <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to EduCode
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: theme.colors.primary, marginBottom: '8px' }}>
                    <Terminal size={32} />
                    <h1 style={{ fontSize: '40px', fontWeight: '800', margin: 0, letterSpacing: '-1px' }}>EduCode Catalog</h1>
                </div>
                <p style={{ color: theme.colors.muted, fontSize: '18px', maxWidth: '600px', margin: 0 }}>
                    Explore our curated professional courses designed to accelerate your engineering career.
                </p>
            </div>

            <div style={gridStyle}>
                {/* CSE101 C Programming Card */}
                <Card
                    style={courseCardStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => navigate('/student/support')}
                >
                    <div style={{ h: '200px', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px' }}>
                        <Terminal size={64} color={theme.colors.primary} />
                    </div>
                    <CardHeader style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontSize: '12px', fontWeight: '700', color: theme.colors.primary, letterSpacing: '1px', textTransform: 'uppercase' }}>Computer Science</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                                <Star size={14} fill="#fbbf24" />
                                <span style={{ fontSize: '14px', fontWeight: '600' }}>4.9</span>
                            </div>
                        </div>
                        <CardTitle style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>CSE101: C Programming</CardTitle>
                        <p style={{ color: theme.colors.muted, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                            Master the fundamentals of procedural programming with C. Learn memory management, pointers, and data structures.
                        </p>
                    </CardHeader>
                    <CardContent style={{ padding: '0 24px 24px', display: 'flex', gap: '20px', fontSize: '13px', color: theme.colors.muted }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock size={16} /> 40 Hours
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Users size={16} /> 1.2k Students
                        </div>
                    </CardContent>
                    <div style={{ padding: '0 24px 24px' }}>
                        <Button style={{ width: '100%', height: '48px', borderRadius: '12px' }}>
                            Apply Now
                        </Button>
                    </div>
                </Card>

                {/* Placeholder for more courses */}
                <Card style={{ ...courseCardStyle, opacity: 0.5, cursor: 'default' }}>
                    <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                        <BookOpen size={48} color="rgba(255,255,255,0.1)" />
                    </div>
                    <CardContent style={{ padding: '24px', textAlign: 'center' }}>
                        <p style={{ color: theme.colors.muted }}>New Courses Coming Soon...</p>
                    </CardContent>
                </Card>
            </div>

            {/* Subtle Admin Link */}
            <div style={{ maxWidth: '1200px', margin: '64px auto 0', textAlign: 'center', opacity: 0.3, fontSize: '12px' }}>
                <span onClick={() => navigate('/admin/dashboard')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    EduCode Administration
                </span>
            </div>
        </div>
    );
};

export default Courses;
