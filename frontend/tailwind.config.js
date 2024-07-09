import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      backgroundImage: (theme) => ({
        "login-background": "url('./assets/login_bg.jpeg')",
      }),
      colors: {
        primary: "#065D2F",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#065D2F",
        },
      },
    ],
  },
};
