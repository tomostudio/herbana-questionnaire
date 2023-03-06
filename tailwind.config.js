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
      fontSize: {
        opHeading: '4.5rem',
        body: '1.125rem',
        heading: '2.5rem',
        subHeading: '0.875rem',
        qHeading: '3.25rem',
        qHeadingb: '1.875rem',
        nav: '0.875rem',
        footer: '0.625rem',
      },
      height: {
        "screen-1/2": "50vh",
      },
      colors: {
        black: "#000",
        white: "#FFF",
        "example-color": {
          light: "#ffb288",
          DEFAULT: "#d18d67",
          dark: "#ce8860",
        },
      },
      transitionProperty: {
        background: "background",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
