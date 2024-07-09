import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "10vh": "10vh",
        "70vh": "70vh",
        "70per": "70%",
      },
      width: {
        "100per": "100%",
        "10vh": "10vh",
        "50vh": "50vh",
      },
      backgroundColor: {
        "main-color": "#EAFAFF",
      },
      padding: {
        '10vh': '10vh',
      },
    },
  },
  plugins: [],
};
export default config;
