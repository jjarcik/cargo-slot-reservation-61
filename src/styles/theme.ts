
export const theme = {
  colors: {
    background: '#F8FAFC',
    foreground: '#1E293B',
    primary: '#3B82F6',
    primaryForeground: '#FFFFFF',
    secondary: '#F1F5F9',
    secondaryForeground: '#1E293B',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    accent: '#F1F5F9',
    accentForeground: '#1E293B',
    destructive: '#EF4444',
    destructiveForeground: '#FFFFFF',
    border: '#E2E8F0',
    input: '#E2E8F0',
    ring: '#1E293B',
    available: '#E5FCEC',
    availableBorder: '#A3E9C1',
    booked: '#E9F0FF',
    bookedBorder: '#B1C5F6',
    conflict: '#FFF0F0',
    conflictBorder: '#FFCDD2',
    card: {
      background: '#FFFFFF',
      foreground: '#1E293B',
    },
  },
  fonts: {
    body: "'Inter', sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  radii: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    glass: '0 0 20px rgba(0, 0, 0, 0.03)',
    glassHover: '0 10px 30px rgba(0, 0, 0, 0.05)',
  },
  animations: {
    fadeIn: 'fade-in 0.4s ease-out',
    fadeUp: 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    scaleIn: 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    blurIn: 'blur-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

export type Theme = typeof theme;
