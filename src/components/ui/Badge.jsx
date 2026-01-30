import React from 'react';
import { theme } from '../../styles/theme';

const Badge = ({ style, variant = "default", children, ...props }) => {
    const variants = {
        default: {
            backgroundColor: theme.colors.primary,
            color: '#ffffff',
            border: 'none',
        },
        secondary: {
            backgroundColor: theme.colors.secondary,
            color: theme.colors.foreground,
            border: 'none',
        },
        destructive: {
            backgroundColor: theme.colors.destructive,
            color: '#ffffff',
            border: 'none',
        },
        outline: {
            backgroundColor: 'transparent',
            border: `1px solid ${theme.colors.border}`,
            color: theme.colors.foreground,
        },
        success: {
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            border: 'none',
        },
        warning: {
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            color: '#f59e0b',
            border: 'none',
        },
    };

    const baseStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: theme.radius.full,
        padding: '2px 10px',
        fontSize: '12px',
        fontWeight: '600',
        fontFamily: theme.font.sans,
        ...variants[variant],
        ...style,
    };

    return (
        <div style={baseStyle} {...props}>
            {children}
        </div>
    );
};

export { Badge };
