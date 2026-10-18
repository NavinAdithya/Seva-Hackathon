export const THEME = {
  colors: {
    canvas: '#0B0F19',
    surface: '#1A1F2E',
    surfaceAlt: '#252B3B',
    accent: '#FEF08A',
    accentDark: '#CA8A04',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    emergency: '#EF4444',
    emergencyDark: '#B91C1C',
    success: '#22C55E',
    warning: '#F59E0B',
    medical: '#3B82F6',
    safety: '#A855F7',
  },
  spacing: {
    touchTarget: 64, // minimum dp for touch targets
    tilePadding: 16,
    screenPadding: 20,
  },
  typography: {
    billboard: 48,
    heading: 28,
    subheading: 20,
    body: 16,
    caption: 14,
  },
} as const;
