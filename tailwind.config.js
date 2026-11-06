/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FAF8F5',
          100: '#F5EFEB',
          200: '#EAE1D7',
          300: '#DDD0C0',
          400: '#CCA785',
          500: '#B08865',
        },
        primary: {
          DEFAULT: '#121212',
          light: '#262626',
          dark: '#0A0A0A',
        },
        gold: {
          50: '#FDFBF5',
          100: '#FAF4E3',
          200: '#F4E7BD',
          300: '#ECD591',
          400: '#E0BF62',
          DEFAULT: '#C5A059',
          500: '#C5A059',
          600: '#B88B38',
          700: '#946C24',
          800: '#75541C',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          50: '#F4F4F5',
          100: '#E4E4E7',
          200: '#D4D4D8',
          300: '#A1A1AA',
          400: '#71717A',
          500: '#52525B',
          600: '#3F3F46',
          700: '#27272A',
          800: '#18181B',
          900: '#121212',
          950: '#09090B',
        },
        sand: {
          DEFAULT: '#F4EFEA',
          light: '#FBF9F6',
          dark: '#E7DFD5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 1px 1px rgba(0, 0, 0, 0.03)',
        'luxury-hover': '0 30px 60px -15px rgba(197, 160, 89, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.08)',
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.35)',
        'gold-glow-lg': '0 0 50px rgba(197, 160, 89, 0.45)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
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
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
