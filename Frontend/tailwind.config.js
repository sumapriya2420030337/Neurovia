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
          bg: '#F8FAFC',       // Very light calming grey-blue
          primary: '#1E293B',  // Deep professional slate
          accent: '#0EA5E9',   // Hopeful sky blue (Buttons/User bubbles)
          secondary: '#64748B',// Soft text for hints
          danger: '#EF4444',   // Crisis Red
          success: '#10B981',  // Safe Green
          msg: {
            bot: '#FFFFFF',    // White bubbles for bot
            user: '#0EA5E9',   // Blue bubbles for user
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean modern font
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}