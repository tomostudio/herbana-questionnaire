const plugin = require('tailwindcss/plugin');

const hoverPlugin = plugin(function({ addVariant, e, postcss }) {
    addVariant('hover', ({ container, separator }) => {
        const hoverRule = postcss.atRule({ name: 'media', params: '(hover: hover)' });
        hoverRule.append(container.nodes);
        container.append(hoverRule);
        hoverRule.walkRules(rule => {
            rule.selector = `.${e(`hover${separator}${rule.selector.slice(1)}`)}:hover`
        });
    });
});

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
      letterSpacing: {
        default: '0.1em'
      },
      borderWidth: {
        default: '1.5px'
      },
      height: {
        header: '75px',
        mHeader: '60px'
      },
      fontSize: {
        opHeading: '4.5rem',
        mopHeading: '2.813rem',
        body: '1.125rem',
        endHeading: '3.75rem',
        mendHeading: '2.063rem',
        heading: '2.5rem',
        mheading: '1.875rem',
        mheading1: '1.563rem',
        subHeading: '0.875rem',
        qHeading: '3.25rem',
        qHeadingb: '1.875rem',
        mqHeadingb: '1.25rem',
        nav: '0.875rem',
        footer: '0.75rem',
        button: '1rem',
        mButton: '0.875rem',
        mInput: '0.875rem',
        mNav: '0.75rem'
      },
      colors: {
        orange: "#E46B37",
        beige: "#FFF7E9",
        blue: '#DFF2F7',
        grey: '#F7F7F3',
        greyPickup: '#6C766C',
        green: '#D8ECD8',
        pink: '#FEEEEF',
        yellow: '#FFC645',
        red: '#FF0000'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [hoverPlugin],
};
