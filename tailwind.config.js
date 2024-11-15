/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      textColor: {
        'primary-color': '#CAECFF',
        'primary-color-300': '#E7F5FD',
        'secondary-color': '#2D9CDB',
        'secondary-color-300': '#0099EE',
        'success-color': '#56E4A0',
        'danger-color': '#F36868'
      },
      backgroundColor: {
        'primary-color': '#CAECFF',
        'primary-color-300': '#E7F5FD',
        'secondary-color': '#2D9CDB',
        'secondary-color-300': '#0099EE',
        'success-color': '#56E4A0',
        'danger-color': '#F36868'
      },
      fontFamily: {},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  },
  plugins: []
}
