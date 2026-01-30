import React from 'react';
import { theme } from '../../styles/theme';

const Card = ({ style, children, ...props }) => {
    return (
        <div
            style={{
                borderRadius: theme.radius.lg,
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.card,
                color: theme.colors.cardForeground,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
};

const CardHeader = ({ style, children, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '24px', ...style }} {...props}>
        {children}
    </div>
);

const CardTitle = ({ style, children, ...props }) => (
    <h3 style={{ fontSize: '20px', fontWeight: '600', lineHeight: '1.2', letterSpacing: '-0.025em', color: '#ffffff', margin: 0, ...style }} {...props}>
        {children}
    </h3>
);

const CardContent = ({ style, children, ...props }) => (
    <div style={{ padding: '24px', paddingTop: 0, ...style }} {...props}>
        {children}
    </div>
);

const CardFooter = ({ style, children, ...props }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '24px', paddingTop: 0, ...style }} {...props}>
        {children}
    </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
