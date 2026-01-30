import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, Search, Trash2, Mail, ExternalLink, Shield, Loader2 } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../shared/config/firebase';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Badge } from '../../../shared/components/ui/Badge';
import { theme } from '../../../shared/styles/theme';
import AdminLayout from './AdminLayout';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');

    useEffect(() => {
        const q = query(collection(db, 'users'), orderBy('name', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const userData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(userData);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesRole = roleFilter === 'All' || user.role === roleFilter;
        const matchesSearch =
            (user.name || '').toLowerCase().includes(search.toLowerCase()) ||
            (user.email || '').toLowerCase().includes(search.toLowerCase());
        return matchesRole && matchesSearch;
    });

    return (
        <AdminLayout>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>User Repository</h1>
                <p style={{ color: theme.colors.muted, fontSize: '16px' }}>
                    Managing {users.length} active members across the EduCode platform.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <StatsBox
                    title="Total Capacity"
                    value={users.length}
                    icon={Users}
                    sub="Active Accounts"
                />
                <StatsBox
                    title="Academic Staff"
                    value={users.filter(u => u.role === 'teacher').length}
                    icon={ShieldCheck}
                    sub="Faculty Access"
                    color="#6366f1"
                />
                <StatsBox
                    title="Students"
                    value={users.filter(u => u.role === 'student').length}
                    icon={Users}
                    sub="Enrolled Learners"
                    color="#10b981"
                />
            </div>

            <Card style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: theme.colors.muted }} />
                        <Input
                            placeholder="Find users by name or email identity..."
                            style={{ paddingLeft: '40px', height: '44px', background: 'rgba(0,0,0,0.2)' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '10px' }}>
                        {['All', 'student', 'teacher'].map(role => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    backgroundColor: roleFilter === role ? theme.colors.primary : 'transparent',
                                    color: roleFilter === role ? '#fff' : theme.colors.muted,
                                    textTransform: 'capitalize'
                                }}
                            >
                                {role === 'teacher' ? 'Admins' : role === 'student' ? 'Students' : 'Overview'}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ padding: '0 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: theme.colors.muted, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <div>User Identity</div>
                        <div>Connectivity</div>
                        <div>Clearance</div>
                        <div style={{ textAlign: 'right' }}>Actions</div>
                    </div>

                    {filteredUsers.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: theme.colors.muted }}>
                            No users matching the specified search parameters.
                        </div>
                    ) : (
                        filteredUsers.map(user => (
                            <div key={user.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: user.role === 'teacher' ? 'linear-gradient(135deg, #1e1b4b, #312e81)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: user.role === 'teacher' ? theme.colors.primary : theme.colors.muted }}>
                                        {user.role === 'teacher' ? <Shield size={20} /> : <Users size={20} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700', color: '#fff' }}>{user.name}</div>
                                        <div style={{ fontSize: '12px', color: theme.colors.muted }}>UID: {user.id}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.colors.muted, fontSize: '14px' }}>
                                    <Mail size={14} /> {user.email}
                                </div>
                                <div>
                                    <Badge variant={user.role === 'teacher' ? 'warning' : 'info'}>
                                        {user.role === 'teacher' ? 'ADMIN STAFF' : 'STUDENT'}
                                    </Badge>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <Button variant="ghost" size="sm" style={{ color: theme.colors.muted }}>
                                        <ExternalLink size={16} />
                                    </Button>
                                    <Button variant="ghost" size="sm" style={{ color: '#ef4444' }}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </AdminLayout>
    );
};

const StatsBox = ({ title, value, icon: Icon, sub, color = theme.colors.primary }) => (
    <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
            <Icon size={120} color={color} />
        </div>
        <div style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.muted, marginBottom: '8px', textTransform: 'uppercase' }}>{title}</div>
        <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{value}</div>
        <div style={{ fontSize: '12px', color: color, marginTop: '8px', fontWeight: '600' }}>{sub}</div>
    </div>
);

export default UserList;
