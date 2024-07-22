/** @type {import('tailwindcss').Config} */
import Form from "@tailwindcss/forms";
import Typography from "@tailwindcss/typography";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}","./src/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [Form, Typography],
};
