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
        white:     'var(--white)',
        ink:       'var(--ink)',
        obsidian:  'var(--obsidian)',
        carbon:    'var(--carbon)',
        graphite:  'var(--graphite)',
        ash:       'var(--ash)',
        'off-white': 'var(--off-white)',
        muted:     'var(--muted)',
        faint:     'var(--faint)',
        accent:    'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'accent-fg': 'var(--accent-fg)',
        'accent-fg-muted': 'var(--accent-fg-muted)',
        profit:    'var(--profit)',
        loss:      'var(--loss)',
        pending:   'var(--pending)',
        neutral:   '#7A7A68',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono:     ['var(--font-ibm-mono)', 'monospace'],
        sans:     ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        bebas:    ['var(--font-bebas)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        full: '9999px',
      },
      boxShadow: {
        'neo':    'var(--neo-shadow)',
        'neo-sm': 'var(--neo-shadow-sm)',
        'neo-lg': 'var(--neo-shadow-lg)',
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
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(10px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
