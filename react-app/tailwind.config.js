const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.ts", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    margin: ["responsive", "first", "hover", "focus"],
    textColor: ["responsive", "first", "hover", "focus"]
  },
  plugins: [require("@tailwindcss/ui")]
};
