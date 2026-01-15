module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        corporate: {
          50: '#f5f8fb',
          100: '#e6eef9',
          200: '#cfe2f6',
          300: '#9fc3ee',
          400: '#5b9be0',
          500: '#2b6fc2',
          600: '#2359a3',
          700: '#1b426f',
          800: '#122a4a',
          900: '#071427'
        },
        corporateAlt: {
          50: '#f8f9fb',
          100: '#eef2f6',
          200: '#e1e7ef',
          300: '#c7d2e0',
          400: '#9fb1c4',
          500: '#6f8aa8',
          600: '#4f6f8f',
          700: '#35506a',
          800: '#22354a',
          900: '#0f1a29'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'corporate-md': '0 6px 18px rgba(40, 63, 101, 0.12)'
      }
    },
  },
  plugins: [],
};