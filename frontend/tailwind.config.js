/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        'title-1': '40px',
        'title-2': '36px',
        'title-3': '32px',
        'title-4': '28px',
        'Base-1': '25px',
        'Base-2': '24px',
        'Base-3': '20px',
        'Base-4': '16px',
      },
    },
  },
  plugins: [daisyui], 
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#EDF2FF",
          secondary: "#00d100",
          accent: "#191919",
          neutral: "#CFE3EE",
          "base-100": "#000319",
          "base-200": "#EAF3F9",
          "base-300": "#ffffff",
          info: "#00e1ff",
          success: "#4DAF6E",
          warning: "#ff942e",
          error: "#E73D1C",
        },
      },
    ],
  },
};
