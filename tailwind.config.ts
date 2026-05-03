import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // RYZE brand palette — deep void + neon spectrum
        void: {
          DEFAULT: '#05060a',
          950: '#03030a',
          900: '#08091a',
          800: '#0d0f25',
          700: '#141633',
        },
        neon: {
          purple: '#9b5cff',
          'purple-bright': '#b884ff',
          blue: '#22d3ff',
          'blue-bright': '#7df0ff',
          pink: '#ff4fd8',
          green: '#5eff9c',
          yellow: '#ffd84f',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          strong: 'rgba(255,255,255,0.08)',
          line: 'rgba(255,255,255,0.10)',
        },
      },
      fontFamily: {
        // Arabic-friendly fonts
        cairo: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
        ibmArabic: ['var(--font-ibm-arabic)', 'system-ui', 'sans-serif'],
        // Aliases for existing CSS usage (now mapped to Arabic fonts)
        display: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-arabic)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'neon-purple': '0 0 30px rgba(155,92,255,0.45), 0 0 80px rgba(155,92,255,0.25)',
        'neon-blue': '0 0 30px rgba(34,211,255,0.45), 0 0 80px rgba(34,211,255,0.25)',
        'neon-pink': '0 0 30px rgba(255,79,216,0.45), 0 0 80px rgba(255,79,216,0.25)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 40px rgba(155,92,255,0.05)',
        glass: '0 8px 32px 0 rgba(2,4,18,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(155,92,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,255,0.06) 1px, transparent 1px)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.6  0 0 0 0 0.4  0 0 0 0 1  0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        'aurora':
          'radial-gradient(60% 80% at 20% 20%, rgba(155,92,255,0.35) 0%, transparent 60%), radial-gradient(50% 70% at 80% 30%, rgba(34,211,255,0.30) 0%, transparent 65%), radial-gradient(70% 90% at 50% 100%, rgba(255,79,216,0.25) 0%, transparent 60%)',
        'neon-line':
          'linear-gradient(90deg, transparent, #9b5cff, #22d3ff, #ff4fd8, transparent)',
      },
      keyframes: {
        'gradient-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'aurora-drift': {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0,-20px,0) rotate(2deg)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.7', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.25)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glitch: {
          '0%,100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px,2px)' },
          '40%': { transform: 'translate(-2px,-2px)' },
          '60%': { transform: 'translate(2px,2px)' },
          '80%': { transform: 'translate(2px,-2px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 16s ease-in-out infinite',
        'aurora-drift': 'aurora-drift 20s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        glitch: 'glitch 0.5s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
