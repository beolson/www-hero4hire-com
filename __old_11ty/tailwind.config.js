module.exports = {
  content: ["./content/**/*liquid", "./_includes/**/*liquid"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
