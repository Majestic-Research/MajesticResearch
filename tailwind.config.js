/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-josefin)',
        alt: 'var(--font-trirong)'
      },

      colors:{
        gray: {
          50: '#eaeaea',
          100: '#bebebf',
          200: '#9e9ea0',
          300: '#727275',
          400: '#56565a',
          500: '#2c2c31',
          600: '#28282d',
          700: '#1f1f23',
          800: '#18181b',
          900: '#121215',
        },
        
        yellow: {
          50: "#faf5ec",
          100: "#f8f0e3",
          200: "#f1e1c5",
          1: "#d19d44",
          400: "#bc8d3d",
          500: "#a77e36",
          600: "#9d7633",
          700: "#7d5e29",
          800: "#5e471f",
          900: "#493718",
        },
        golden: {
          50: "#fffaf1",
          100: "#fff7e9",
          200: "#ffefd2",
          1: "#ffca6e",
          400: "#e6b663",
          500: "#cca258",
          600: "#bf9853",
          700: "#997942",
          800: "#735b31",
          900: "#594727",
        },
        bronze: {
          50: "#f3efe9",
          100: "#ede7dd",
          200: "#d9cdb9",
          1: "#855f1e",
          400: "#78561b",
          500: "#6a4c18",
          600: "#644717",
          700: "#503912",
          800: "#3c2b0d",
          900: "#2f210b",
        },
        
        backdropFilter: {
          'blur': 'blur(5px)', // Ajuste o valor de blur conforme necessário
        },
        backgroundColor: {
          'blur': 'rgba(0, 0, 0, 0.5)', // Ajuste a cor de fundo com transparência
        },
      }
    },
  },
  plugins: [],
}
