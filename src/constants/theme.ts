export const THEME = {
  colors: {
    canvas: '#0B0F19',
    canvasRaised: '#111726',
    surface: '#1A2133',
    surfaceElevated: '#232D42',
    surfaceInteractive: '#2C3852',
    surfaceAlt: '#252B3B',

    hairline: '#2A364F',
    hairlineStrong: '#3B4D70',
    hairlineHighlight: '#FEF08A',

    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',

    accent: '#FEF08A',
    accentDark: '#CA8A04',
    accentPressed: '#EAB308',
    accentOnHighVis: '#0B0F19',

    emergency: '#EF4444',
    emergencyCritical: '#EF4444',
    emergencyCriticalBg: 'rgba(239, 68, 68, 0.14)',
    emergencyHigh: '#F59E0B',
    emergencyHighBg: 'rgba(245, 158, 11, 0.14)',
    emergencyStable: '#10B981',
    emergencyStableBg: 'rgba(16, 185, 129, 0.14)',

    emergencyDark: '#B91C1C',
    success: '#10B981',
    warning: '#F59E0B',
    medical: '#38BDF8',
    safety: '#A855F7',
    fire: '#F97316',
    disaster: '#06B6D4',
  },
  spacing: {
    touchTarget: 64, // minimum dp for primary emergency tiles
    touchTargetStandard: 48, // auxiliary buttons
    tilePadding: 16,
    screenPadding: 20,
    gap: 12,
  },
  borderRadius: {
    tile: 20,
    card: 16,
    chip: 12,
    pill: 9999,
  },
  typography: {
    billboard: 52,
    headingXL: 28,
    heading: 24,
    subheading: 18,
    body: 16,
    caption: 13,
  },
} as const;

export type ThemeColors = typeof THEME.colors;
