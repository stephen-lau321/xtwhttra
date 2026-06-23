/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FDF8F3",
          100: "#F9EDE0",
          200: "#F0D4B8",
          300: "#E5B88A",
          400: "#D99A5C",
          500: "#C97D3A",
          600: "#A8652E",
          700: "#8B5E3C",
          800: "#6F4A2E",
          900: "#5A3D25",
        },
        warm: {
          50: "#FEFCF8",
          100: "#FDF6EC",
          200: "#F9EAD0",
          300: "#F3D9B0",
          400: "#EDC88F",
          500: "#FAF6F1",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"PingFang SC"',
          '"Noto Sans SC"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
