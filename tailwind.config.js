/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'hero': "url('../assets/images/bgImage.png')",
        'veggies': "url('../images/veggies.webp')",
        'plate': "url('../images/plate.jpg')",
        'new': "url('../images/new_bg.png')",
        'kitchen': "url('../images/kitchen.jpg')",
      },
      boxShadow: {
        'glow': '0 0 10px 5px rgba(87, 247, 108)',
        'nav': '0 0 10px 5px rgba(0, 0, 0, 0.8)'
      },
      scale: {
        '175': '1.75',
      },
      dropShadow: {
        '3xl': '15px 15px 25px rgba(0, 0, 0, 0.30)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
  },
  plugins: [],
};
