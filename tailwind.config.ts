import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        surface: '#1A1A1E',
        'surface-2': '#15151A',
        border: '#2A2A30',
        'border-soft': '#22222A',
        muted: '#8A8A8F',
        'muted-2': '#6A6A70',
        teal: '#00D4AA',
        violet: '#7B5FFF',
        cyan: '#00B4D8',
        steel: '#C0C0C8',
        magenta: '#E040A0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #00D4AA 0%, #7B5FFF 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(0,212,170,0.18) 0%, rgba(123,95,255,0.18) 100%)',
        'gradient-radial-teal': 'radial-gradient(120% 80% at 100% 0%, rgba(0,212,170,0.10), transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config
