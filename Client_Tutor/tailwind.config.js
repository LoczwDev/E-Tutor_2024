/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6636",
        secondary: "#564FFD",
        warning: "#FD8E1F",
        success: "#23BD33",
        error: "#E34444",
        gray0: "#F5F7FA",
        gray1: "#E9EAF0",
        gray3: "#B7BAC7",
        gray4: "#A1A5B3",
        gray5: "#8C94A3",
        gray6: "#6E7485",
        gray7: "#4E5566",
        gray9: "#1D2026",
        linear: "#F0F2F5",
        background: "#f5f6f7",
      },
      boxShadow: {
        header: "0px 4px 10px rgba(0, 0, 0, 0.06)",
        tooltip: "0px 4px 20px 0px rgba(29, 32, 38, 0.12);",
        card: "0 4px 8px #0000001a",
        drop: "0 -4px 32px #0003;",
        section: "0 0 10px rgba(116, 116, 116, 0.08)",
      },
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require("daisyui"),
  ],
};
