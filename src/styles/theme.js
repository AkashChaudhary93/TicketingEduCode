export const theme = {
    colors: {
        background: '#0a0d14',
        card: '#1a1f2e',
        primary: '#6366f1', // Indigo
        primaryHover: '#4f46e5',
        secondary: '#374151',
        foreground: '#f8fafc',
        muted: '#94a3b8',
        border: '#1e293b',
        success: '#10b981',
        warning: '#f59e0b',
        destructive: '#ef4444',
        purple: '#a855f7',
        purpleHover: '#9333ea',
    },
    glass: {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    },
    radius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
        full: '9999px',
    },
    spacing: (val) => `${val * 4}px`,
    font: {
        sans: "'Inter', sans-serif",
    }
};

export const commonStyles = {
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexBetween: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: '24px',
        border: `1px solid ${theme.colors.border}`,
    },
    input: {
        backgroundColor: 'transparent',
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.md,
        padding: '8px 12px',
        color: theme.colors.foreground,
        width: '100%',
        transition: 'all 0.2s ease',
    }
};
