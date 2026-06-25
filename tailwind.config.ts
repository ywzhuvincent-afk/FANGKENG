import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'atp-bg': {
          page: 'var(--atp-bg-page)',
          card: 'var(--atp-bg-card)',
          soft: 'var(--atp-bg-soft)',
          divider: 'var(--atp-bg-divider)',
        },
        'atp-text': {
          primary: 'var(--atp-text-primary)',
          secondary: 'var(--atp-text-secondary)',
          tertiary: 'var(--atp-text-tertiary)',
          disabled: 'var(--atp-text-disabled)',
        },
        'atp-accent': {
          DEFAULT: 'var(--atp-accent)',
          dark: 'var(--atp-accent-dark)',
          bg: 'var(--atp-accent-bg)',
          soft: 'var(--atp-accent-soft)',
        },
        'atp-trust': {
          DEFAULT: 'var(--atp-trust)',
          light: 'var(--atp-trust-light)',
        },
        'atp-premium': {
          DEFAULT: 'var(--atp-premium)',
          bg: 'var(--atp-premium-bg)',
          border: 'var(--atp-premium-border)',
        },
        'atp-success': {
          DEFAULT: 'var(--atp-success)',
          bg: 'var(--atp-success-bg)',
        },
        'atp-warning': {
          DEFAULT: 'var(--atp-warning)',
          bg: 'var(--atp-warning-bg)',
        },
        'atp-wechat': {
          green: 'var(--atp-wechat-green)',
        },
      },
      borderRadius: {
        'atp-sm': 'var(--atp-radius-sm)',
        'atp-md': 'var(--atp-radius-md)',
        'atp-lg': 'var(--atp-radius-lg)',
        'atp-xl': 'var(--atp-radius-xl)',
        'atp-2xl': 'var(--atp-radius-2xl)',
        'atp-pill': 'var(--atp-radius-pill)',
      },
      fontFamily: {
        sans: [
          'PingFang SC',
          'Noto Sans SC',
          'Microsoft YaHei',
          'Inter',
          '-apple-system',
          'system-ui',
          'sans-serif',
        ],
        serif: ['Noto Serif SC', 'Source Han Serif', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
