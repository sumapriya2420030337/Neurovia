/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neuro: {
          // BASED ON LOGO:
          bg: '#F0FDFA',       // Lightest Mint (Background)
          primary: '#0D9488',  // Deep Teal (Text / Heavy Elements)
          accent: '#14B8A6',   // Bright Teal (Buttons / Icons / Logo Color)
          light: '#CCFBF1',    // Soft Mint (Chat Bubbles)
          
          secondary: '#64748B', // Slate Grey (Subtext)
          danger: '#EF4444',    // Crisis Red (Kept for safety)
          success: '#10B981',   // Nature Green
          
          msg: {
            bot: '#FFFFFF',     // White bubbles for bot
            user: '#14B8A6',    // Teal bubbles for user
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'], // Friendly font for headers
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}