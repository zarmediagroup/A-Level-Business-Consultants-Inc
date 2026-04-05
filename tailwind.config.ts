import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:       '#080808',
        obsidian:  '#101010',
        carbon:    '#181818',
        graphite:  '#282828',
        ash:       '#363636',
        'off-white': '#F0F0EE',
        muted:     '#888888',
        faint:     '#404040',
        profit:    '#16A34A',
        loss:      '#DC2626',
        pending:   '#D97706',
        neutral:   '#525252',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono:     ['var(--font-ibm-mono)', 'monospace'],
        sans:     ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        bebas:    ['var(--font-bebas)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1px',
        sm: '1px',
        md: '2px',
        lg: '2px',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'pulse-down': 'pulseDown 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
