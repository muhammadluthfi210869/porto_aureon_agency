/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // ═══════════════════════════════════════════════════════════════
                // MIDNIGHT ELEGANCE PALETTE
                // Dark Mode (Authority) + Light Mode (Clinical Clean)
                // ═══════════════════════════════════════════════════════════════

                // Primary Dark Backgrounds
                midnight: {
                    DEFAULT: '#050505',
                    obsidian: '#050505',
                    deep: '#030303',
                },
                slate: {
                    dark: '#050505',
                    light: '#94A3B8',
                },

                // Light Mode Backgrounds (Clinical Clean)
                ivory: {
                    DEFAULT: '#FAFAF9',
                    pure: '#FFFFFF',
                    soft: '#F5F5F4',
                    warm: '#FAF9F7',
                },
                pearl: {
                    DEFAULT: '#F5F5F4',
                    grey: '#E7E5E4',
                },

                // Text Colors
                porcelain: {
                    DEFAULT: '#FAFAF9',
                    white: '#FAFAF9',
                },
                charcoal: {
                    DEFAULT: '#1C1917',
                    soft: '#292524',
                    muted: '#44403C',
                },
                muted: {
                    DEFAULT: '#94A3B8',
                    grey: '#94A3B8',
                    dark: '#57534E', // For light backgrounds
                },

                // Accent Colors
                gold: {
                    DEFAULT: '#C5A059',
                    champagne: '#C5A059',
                    surgical: '#B8A04A', // Cooler gold for clinical feel
                    dark: '#A08040',     // For light backgrounds
                },
                platinum: {
                    DEFAULT: '#C0C0C0',
                    silver: '#D4D4D8',
                },

                // Status Colors
                maroon: {
                    DEFAULT: '#7F1D1D',
                    deep: '#7F1D1D',
                },
                'medical-red': '#FF3B30',
                'clinical-green': '#22C55E',
            },
            fontFamily: {
                // Serif - For Headings
                display: ['Cinzel', 'Playfair Display', 'serif'],
                serif: ['Cinzel', 'Playfair Display', 'serif'],
                // Sans - For Body
                sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
                body: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                // Gradient backgrounds to avoid flat look
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-midnight': 'linear-gradient(to bottom, #050505, #000000)',
                'gradient-surface': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0))',
            },
            boxShadow: {
                // Glassmorphism shadows
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.15)',
                'gold': '0 0 20px rgba(197, 160, 89, 0.15)',
                'gold-lg': '0 0 40px rgba(197, 160, 89, 0.25)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
        },
    },
    plugins: [],
}
