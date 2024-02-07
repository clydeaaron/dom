/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'cream': '#FFF4F2',
        'lightred' : '#EEB3B0',
        'red' : '#F15950',
        'blue': '#1fb6ff',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#91E683',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        'primary': '#D5DE24',
        'slightwhite' : '#F7F7F7',
        'lightgray' : '#CBCBCB',
        'dark': '#4B4B4B'
      },
      backgroundImage: {
        // NameHackDesk: "url('../src/img/HackDeskName.webp')",
        // LogoHackDesk: "url('../src/img/HackDeskLogo.webp')",
        // LogoBg: "url('../src/img/Vector2.jpeg')",
        // GrayLogo: "url('../src/img/GrayLogo.svg')",
        Logo: "url('../src/assets/image/cvsulogo.png')",
        Login: "url('../src/assets/image/campus.jpg')"
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        capriola: ['Capriola'],
        sansserif: ["IBM Plex Sans","Helvetica Neue","Arial"]
      },
    },
  },
  plugins: [],
}
