module.exports = {
  mode: "jit",
  purge: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.,
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      maison: ["Maison", "sans-serif"],
      maisonMono: ["Maison Mono", "sans-serif"],
    },
    extend: {
      height: {
        header: '75px'
      },
      fontSize: {
        opHeading: '4.5rem',
        body: '1.125rem',
        heading: '2.5rem',
        subHeading: '0.875rem',
        qHeading: '3.25rem',
        qHeadingb: '1.875rem',
        nav: '0.875rem',
        footer: '0.625rem',
        button: '1rem'
      },
      colors: {
        orange: "#E46B37",
        beige: "#FFF7E9",
        blue: '#DFF2F7',
        grey: '#F7F7F3',
        green: '#D8ECD8',
        pink: '#FEEEEF'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
