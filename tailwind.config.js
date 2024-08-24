module.exports = {
  darkMode: "class",
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: [/^bg-/, /^text-/], // Safelist classes that match the patterns
    },
  },
  variants: {},
  plugins: [],
};
