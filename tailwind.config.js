import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './pages/**/*.{ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': '#16a34a',
                'primary-light': '#22c55e',
                'primary-dark': '#15803d',
                'matrix': '#00ff41',
                'background-dark': '#040806',
                'surface-dark': '#0b120e',
                'surface-raised': '#111a14',
                'text-secondary': '#93a69a',
                'border-dark': '#1a2a1f',
            },
            fontFamily: {
                'display': ['Space Grotesk', 'sans-serif'],
                'body': ['Noto Sans', 'sans-serif'],
                'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
            },
            borderRadius: {
                'DEFAULT': '0.125rem',
                'sm': '0.125rem',
                'lg': '0.25rem',
                'xl': '0.5rem',
                'full': '9999px',
            },
            boxShadow: {
                'glow': '0 0 24px -6px rgba(0, 255, 65, 0.45)',
                'glow-sm': '0 0 12px -4px rgba(0, 255, 65, 0.5)',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                blink: {
                    '0%, 49%': { opacity: '1' },
                    '50%, 100%': { opacity: '0' },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'zoom-in': {
                    '0%': { opacity: '0', transform: 'scale(0.96)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            animation: {
                marquee: 'marquee 80s linear infinite',
                blink: 'blink 1s steps(1) infinite',
                // No fill-mode: a lingering transform on <main> would trap the fixed modals inside it
                'fade-up': 'fade-up 0.45s ease-out',
                'fade-in': 'fade-in 0.25s ease-out both',
                'zoom-in': 'zoom-in 0.25s ease-out both',
            },
        },
    },
    plugins: [forms],
};
