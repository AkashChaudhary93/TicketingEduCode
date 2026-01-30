import React from 'react';

// Skeleton base component with shimmer animation
const Skeleton = ({
    width = '100%',
    height = '20px',
    borderRadius = '8px',
    style = {},
    className = ''
}) => {
    const skeletonStyle = {
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style,
    };

    return (
        <>
            <style>
                {`
                    @keyframes shimmer {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                `}
            </style>
            <div style={skeletonStyle} className={className} />
        </>
    );
};

// Skeleton Text - for text lines
export const SkeletonText = ({ lines = 1, gap = '12px' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                width={i === lines - 1 && lines > 1 ? '70%' : '100%'}
                height="16px"
            />
        ))}
    </div>
);

// Skeleton Avatar - for circular avatars
export const SkeletonAvatar = ({ size = '48px' }) => (
    <Skeleton width={size} height={size} borderRadius="50%" />
);

// Skeleton Card - for card placeholders
export const SkeletonCard = ({ height = '120px' }) => (
    <div style={{
        background: 'rgba(20, 20, 30, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        height,
    }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <SkeletonAvatar size="40px" />
            <div style={{ flex: 1 }}>
                <Skeleton width="60%" height="14px" style={{ marginBottom: '8px' }} />
                <Skeleton width="40%" height="12px" />
            </div>
        </div>
        <SkeletonText lines={2} />
    </div>
);

// Skeleton Stat Card - for dashboard stat cards
export const SkeletonStatCard = () => (
    <div style={{
        background: 'rgba(30, 30, 45, 0.5)',
        borderRadius: '20px',
        padding: '28px',
        height: '140px',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Skeleton width="44px" height="44px" borderRadius="12px" />
            <Skeleton width="100px" height="14px" />
        </div>
        <Skeleton width="80px" height="36px" />
    </div>
);

// Skeleton Table Row
export const SkeletonTableRow = ({ columns = 4 }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
    }}>
        {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} width={i === 0 ? '80%' : '60%'} height="14px" />
        ))}
    </div>
);

// Skeleton Table - full table placeholder
export const SkeletonTable = ({ rows = 5, columns = 4 }) => (
    <div style={{
        background: 'rgba(20, 20, 30, 0.5)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
        {/* Header */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '16px',
            padding: '16px 20px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}>
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} width="70%" height="12px" />
            ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
            <SkeletonTableRow key={i} columns={columns} />
        ))}
    </div>
);

// Skeleton Query Card - for query list items
export const SkeletonQueryCard = () => (
    <div style={{
        background: 'rgba(20, 20, 30, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <SkeletonAvatar size="36px" />
                <div>
                    <Skeleton width="120px" height="14px" style={{ marginBottom: '6px' }} />
                    <Skeleton width="80px" height="10px" />
                </div>
            </div>
            <Skeleton width="70px" height="24px" borderRadius="12px" />
        </div>
        <Skeleton width="90%" height="14px" style={{ marginBottom: '8px' }} />
        <Skeleton width="60%" height="14px" />
    </div>
);

// Skeleton Dashboard - full dashboard loading state
export const SkeletonDashboard = () => (
    <div>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <SkeletonStatCard />
            <SkeletonStatCard />
            <SkeletonStatCard />
        </div>
        {/* Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <SkeletonTable rows={5} columns={4} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SkeletonCard height="200px" />
                <SkeletonCard height="150px" />
            </div>
        </div>
    </div>
);

// Skeleton Profile - for profile page loading
export const SkeletonProfile = () => (
    <div style={{
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(20, 20, 30, 0.6)',
        borderRadius: '24px',
        padding: '40px',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
            <SkeletonAvatar size="80px" />
            <div>
                <Skeleton width="180px" height="24px" style={{ marginBottom: '8px' }} />
                <Skeleton width="140px" height="14px" />
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <Skeleton width="80px" height="10px" style={{ marginBottom: '8px' }} />
                <Skeleton width="100%" height="48px" borderRadius="12px" />
            </div>
            <div>
                <Skeleton width="100px" height="10px" style={{ marginBottom: '8px' }} />
                <Skeleton width="100%" height="48px" borderRadius="12px" />
            </div>
            <div>
                <Skeleton width="90px" height="10px" style={{ marginBottom: '8px' }} />
                <Skeleton width="100%" height="48px" borderRadius="12px" />
            </div>
            <Skeleton width="100%" height="52px" borderRadius="12px" style={{ marginTop: '8px' }} />
        </div>
    </div>
);

// Skeleton Query List - for query inbox
export const SkeletonQueryList = ({ count = 4 }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonQueryCard key={i} />
        ))}
    </div>
);

export default Skeleton;
