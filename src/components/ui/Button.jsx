import React, { useState } from 'react';
import { theme } from '../../styles/theme';

const Button = React.forwardRef(({ className, style, variant = 'primary', size = 'default', children, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: {
      backgroundColor: isHovered ? theme.colors.primaryHover : theme.colors.primary,
      color: '#ffffff',
      boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.2)',
    },
    secondary: {
      backgroundColor: isHovered ? 'rgba(55, 65, 81, 0.8)' : theme.colors.secondary,
      color: theme.colors.foreground,
    },
    outline: {
      backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      border: `1px solid ${theme.colors.border}`,
      color: theme.colors.foreground,
    },
    ghost: {
      backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      color: theme.colors.foreground,
    },
    destructive: {
      backgroundColor: isHovered ? '#dc2626' : theme.colors.destructive,
      color: '#ffffff',
    },
  };

  const sizes = {
    default: { height: '40px', padding: '0 16px' },
    sm: { height: '36px', padding: '0 12px', fontSize: '14px' },
    lg: { height: '48px', padding: '0 32px', fontSize: '18px' },
    icon: { height: '40px', width: '40px', padding: '0' },
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    fontWeight: '500',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    fontFamily: theme.font.sans,
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  return (
    <button
      ref={ref}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
