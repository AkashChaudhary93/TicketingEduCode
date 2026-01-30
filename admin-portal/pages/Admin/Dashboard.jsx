import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertCircle, CheckCircle, ArrowRight, MessageSquare, Inbox, TrendingUp, Activity } from 'lucide-react';
import { useQueries } from '../../../shared/context/QueryContext';
import { theme } from '../../../shared/styles/theme';
import AdminLayout from './AdminLayout';
import { SkeletonDashboard } from '../../../shared/components/ui/Skeleton';

const StatCard = ({ title, value, icon: Icon, gradient, shadowColor }) => (
    <div style={{
        background: gradient,
        borderRadius: '20px',
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 8px 32px ${shadowColor}`,
    }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-30px', right: '20px', width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)' }}>
                    <Icon size={20} color="#fff" />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</span>
            </div>
            <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', margin: 0 }}>{value}</h3>
        </div>
    </div>
);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { getStats, loading } = useQueries();
    const stats = getStats();

    const glassCardStyle = {
        background: 'rgba(20, 24, 35, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        overflow: 'hidden',
    };

    if (loading) {
        return (
            <AdminLayout>
                <div style={{ marginBottom: '36px' }}>
                    <h1 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Workspace Overview</h1>
                    <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '15px' }}>Loading dashboard data...</p>
                </div>
                <SkeletonDashboard />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Header */}
            <div style={{ marginBottom: '36px' }}>
                <h1 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Workspace Overview</h1>
                <p style={{ color: 'rgba(148, 163, 184, 0.7)', fontSize: '15px' }}>Welcome back. Here's what's happening with EduCode today.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <StatCard
                    title="Total Tickets"
                    value={stats.total}
                    icon={MessageSquare}
                    gradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                    shadowColor="rgba(99, 102, 241, 0.25)"
                />
                <StatCard
                    title="Pending"
                    value={stats.pending}
                    icon={AlertCircle}
                    gradient="linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
                    shadowColor="rgba(245, 158, 11, 0.25)"
                />
                <StatCard
                    title="Resolved"
                    value={stats.resolved}
                    icon={CheckCircle}
                    gradient="linear-gradient(135deg, #10b981 0%, #06b6d4 100%)"
                    shadowColor="rgba(16, 185, 129, 0.25)"
                />
            </div>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                {/* Chart Card */}
                <div style={glassCardStyle}>
                    <div style={{ padding: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <TrendingUp size={20} color={theme.colors.primary} />
                            <span style={{ fontSize: '17px', fontWeight: '600', color: '#fff' }}>Resolution Performance</span>
                        </div>
                        <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', outline: 'none' }}>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div style={{ padding: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '180px' }}>
                            {[65, 45, 85, 55, 75, 90, 78].map((h, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '100%',
                                        height: `${h}%`,
                                        background: `linear-gradient(to top, rgba(99, 102, 241, ${0.4 + (h / 200)}), rgba(139, 92, 246, ${0.6 + (h / 200)}))`,
                                        borderRadius: '6px 6px 4px 4px',
                                        position: 'relative',
                                    }}>
                                        <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', color: 'rgba(148, 163, 184, 0.7)' }}>{h}%</div>
                                    </div>
                                    <span style={{ fontSize: '11px', color: 'rgba(148, 163, 184, 0.5)' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'rgba(148, 163, 184, 0.6)' }}>Query Resolution Rate by Day</div>
                    </div>
                </div>

                {/* Right Panel */}
                <div style={glassCardStyle}>
                    <div style={{ padding: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Activity size={20} color="#f59e0b" />
                            <span style={{ fontSize: '17px', fontWeight: '600', color: '#fff' }}>Quick Actions</span>
                        </div>
                    </div>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Alert */}
                        <div style={{
                            padding: '16px',
                            borderRadius: '14px',
                            background: 'rgba(245, 158, 11, 0.08)',
                            border: '1px solid rgba(245, 158, 11, 0.15)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <AlertCircle color="#f59e0b" size={18} style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#f59e0b' }}>{stats.pending || 0} Pending Tasks</div>
                                    <div style={{ fontSize: '12px', color: 'rgba(245, 158, 11, 0.7)', marginTop: '4px' }}>Require your attention</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => navigate('/queries')}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                            }}
                        >
                            Open Inbox <Inbox size={18} />
                        </button>

                        {/* System Health */}
                        <div style={{ marginTop: '8px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '14px' }}>System Health</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <HealthBar label="Database" percentage={98} />
                                <HealthBar label="Auth Service" percentage={100} />
                                <HealthBar label="Storage" percentage={76} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

const HealthBar = ({ label, percentage }) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(148, 163, 184, 0.7)', marginBottom: '6px' }}>
            <span>{label}</span>
            <span style={{ color: percentage > 80 ? '#10b981' : '#f59e0b' }}>{percentage}%</span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
                height: '100%',
                width: `${percentage}%`,
                background: percentage > 80 ? 'linear-gradient(90deg, #10b981, #06b6d4)' : 'linear-gradient(90deg, #f59e0b, #ef4444)',
                borderRadius: '3px',
            }} />
        </div>
    </div>
);

export default AdminDashboard;
