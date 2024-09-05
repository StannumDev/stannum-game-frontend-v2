import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background':{
          DEFAULT: '#0a0a0a'
        },
        'invalid':{
          DEFAULT: '#f45050'
        },
        stannum:{
          DEFAULT: '#67ccb9',
          hover:'#8cdccd',
        },
        tmd:{
          DEFAULT:'#144859',
          hover:'#2c6a7e'
        },
        card:{
          DEFAULT:'#1f1f1f',
          light:'#333333',
          lighter:'#515151',
          lightest:'#646464',
        }
      },
    },
  },
  plugins: [],
};

export default config;