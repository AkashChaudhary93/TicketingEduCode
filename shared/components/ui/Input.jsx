import React, { useState } from 'react';
import { theme } from '../../styles/theme';

const Input = React.forwardRef(({ className, style, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseStyle = {
        display: 'flex',
        height: '40px',
        width: '100%',
        borderRadius: theme.radius.md,
        border: `1px solid ${isFocused ? theme.colors.primary : theme.colors.border}`,
        backgroundColor: 'transparent',
        padding: '8px 12px',
        fontSize: '14px',
        color: theme.colors.foreground,
        outline: 'none',
        transition: 'all 0.2s ease',
        boxShadow: isFocused ? `0 0 0 2px rgba(99, 102, 241, 0.2)` : 'none',
        fontFamily: theme.font.sans,
        ...style,
    };

    return (
        <input
            type={type}
            style={baseStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = "Input";

export { Input };
