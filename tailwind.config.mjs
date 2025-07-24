/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'theme-primary': 'var(--theme-primary)',
        'theme-bg': 'var(--theme-bg)',
        'theme-surface': 'var(--theme-surface)',
        'theme-text': 'var(--theme-text)',
        'theme-text-light': 'var(--theme-text-light)',
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
        serif: ['Roboto Serif', 'Georgia', 'serif'],
      },
      animation: {
        'bounce-subtle': 'bounce 1s infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'cta': '0 4px 15px rgba(59, 130, 246, 0.3)',
        'cta-hover': '0 6px 20px rgba(59, 130, 246, 0.4)',
      },
      transitionProperty: {
        'all-smooth': 'all',
      },
    },
  },
  plugins: [],
}