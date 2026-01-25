/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand colors: Blue #3b9eb3, Orange #ff6b35
        primary: {
          50: '#edf8fa',
          100: '#d4eff4',
          200: '#a9dfe9',
          300: '#7dcfde',
          400: '#52bfd3',
          500: '#3b9eb3', // Brand blue
          600: '#2f7e8f',
          700: '#235f6b',
          800: '#183f48',
          900: '#0c2024',
        },
        accent: {
          50: '#fff4ef',
          100: '#ffe4d9',
          200: '#ffc9b3',
          300: '#ffae8d',
          400: '#ff8c61',
          500: '#ff6b35', // Brand orange
          600: '#e55a2a',
          700: '#bf4a23',
          800: '#993b1c',
          900: '#732c15',
        },
        neutral: {
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e0',
          400: '#a0aec0',
          500: '#718096',
          600: '#4a5568',
          700: '#2d3748',
          800: '#1a202c',
          900: '#171923',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Japanese gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      }
    },
  },
  plugins: [],
};
