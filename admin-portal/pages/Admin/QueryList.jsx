import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, Trash2, Clock, Phone, Mail, Hash, Filter, RotateCcw } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/ui/Card';
import { Badge } from '../../../shared/components/ui/Badge';
import { useQueries } from '../../../shared/context/QueryContext';
import { theme } from '../../../shared/styles/theme';
import AdminLayout from './AdminLayout';
import { SkeletonQueryList } from '../../../shared/components/ui/Skeleton';

const QueryList = () => {
    const navigate = useNavigate();
    const { queries, updateStatus, deleteQuery, loading } = useQueries();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredQueries = queries.filter(q => {
        const matchesFilter = filter === 'All' || q.status === filter;
        const nameStr = q.name || '';
        const subjectStr = q.subject || '';
        const regNoStr = q.regNo || '';
        const idStr = q.id || '';

        const matchesSearch =
            nameStr.toLowerCase().includes(search.toLowerCase()) ||
            subjectStr.toLowerCase().includes(search.toLowerCase()) ||
            regNoStr.includes(search) ||
            idStr.includes(search);
        return matchesFilter && matchesSearch;
    });

    return (
        <AdminLayout>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Query Inbox</h1>
                    <p style={{ color: theme.colors.muted, fontSize: '16px' }}>Manage and respond to student inquiries.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline" size="sm" onClick={() => { setSearch(''); setFilter('All'); }} style={{ borderColor: 'rgba(255,255,255,0.05)', color: theme.colors.muted }}>
                        <RotateCcw size={14} style={{ marginRight: '8px' }} /> Refresh
                    </Button>
                </div>
            </div>

            <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '12px', width: '16px', height: '16px', color: theme.colors.muted }} />
                        <Input
                            placeholder="Filter by name, ID, registration number..."
                            style={{ paddingLeft: '40px', backgroundColor: 'rgba(0,0,0,0.2)', height: '44px' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {['All', 'Pending', 'Resolved'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        backgroundColor: filter === status ? theme.colors.primary : 'transparent',
                                        color: filter === status ? '#fff' : theme.colors.muted,
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {loading ? (
                        <SkeletonQueryList count={4} />
                    ) : filteredQueries.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '100px 0', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '20px', color: theme.colors.muted }}>
                            No inquiries found matching your criteria.
                        </div>
                    ) : (
                        filteredQueries.map((query) => (
                            <Card key={query.id} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1, padding: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                            <Badge variant={query.status === 'Resolved' ? 'success' : 'warning'}>
                                                {query.status}
                                            </Badge>
                                            <span style={{ fontSize: '13px', color: theme.colors.muted }}>ID: {query.id}</span>
                                            <span style={{ fontSize: '13px', color: theme.colors.muted }}>•</span>
                                            <span style={{ fontSize: '13px', color: theme.colors.muted }}>
                                                {query.timestamp?.toDate ? query.timestamp.toDate().toLocaleString() : (query.timestamp ? new Date(query.timestamp).toLocaleString() : 'Just now')}
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>{query.subject}</h3>
                                        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>{query.description}</p>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '16px', backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                                                <Hash size={14} color={theme.colors.primary} />
                                                <span style={{ color: theme.colors.muted }}>Reg:</span> {query.regNo}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                                                <Phone size={14} color={theme.colors.primary} />
                                                <span style={{ color: theme.colors.muted }}>WhatsApp:</span> {query.whatsapp}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', gridColumn: 'span 2' }}>
                                                <Mail size={14} color={theme.colors.primary} />
                                                <span style={{ color: theme.colors.muted }}>Email:</span> {query.email}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ padding: '24px', minWidth: '200px', backgroundColor: 'rgba(255,255,255,0.01)', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                                        {query.status?.toLowerCase() === 'pending' ? (
                                            <Button
                                                style={{ backgroundColor: '#10b981', color: '#fff' }}
                                                onClick={() => updateStatus(query.id, 'resolved')}
                                            >
                                                Mark Resolved
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                style={{ borderColor: '#f59e0b', color: '#f59e0b' }}
                                                onClick={() => updateStatus(query.id, 'pending')}
                                            >
                                                Reopen Ticket
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            style={{ color: '#ef4444' }}
                                            onClick={() => deleteQuery(query.id)}
                                        >
                                            <Trash2 size={16} style={{ marginRight: '8px' }} /> Permanent Delete
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </Card>
        </AdminLayout>
    );
};

export default QueryList;
