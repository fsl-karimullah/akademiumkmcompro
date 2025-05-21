/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 4s ease-in-out infinite",
        floatSlow: "float 7s ease-in-out infinite",
        pulse: "pulse 2s infinite",
        "pulse-slow": "pulse 6s infinite",
        bounce: "bounce 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
