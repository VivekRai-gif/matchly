/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5a72df',
          10: '#5a72df',
          20: '#7080e3',
          30: '#858fe7',
          40: '#979eeb',
          50: '#aaaeee',
          60: '#bbbaf2',
        },
        surface: {
          10: '#121212',
          20: '#282828',
          30: '#3f3f3f',
          40: '#575757',
          50: '#717171',
          60: '#8b8b8b',
        },
        tonal: {
          10: '#1b1b23',
          20: '#303038',
          30: '#46464d',
          40: '#5e5e64',
          50: '#77777c',
          60: '#909095',
        },
        success: {
          10: '#22946e',
          20: '#47d5a6',
          30: '#9ae8ce',
        },
        warning: {
          10: '#a87a2a',
          20: '#d7ac61',
          30: '#ecd7b2',
        },
        danger: {
          10: '#9c2121',
          20: '#d94a4a',
          30: '#eb9e9e',
        },
        info: {
          10: '#21498a',
          20: '#4077d1',
          30: '#92b2e5',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(90, 114, 223, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(90, 114, 223, 0.8), 0 0 60px rgba(90, 114, 223, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
