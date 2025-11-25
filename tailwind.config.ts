import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: {
  				DEFAULT: '#0a0a0a',
  				sidebar: '#111111'
  			},
  			invalid: {
  				DEFAULT: '#f45050'
  			},
  			stannum: {
  				DEFAULT: '#00FFCC',
  				light: '#4fffdc'
  			},
  			tmd: {
  				DEFAULT: '#144859',
  				hover: '#2c6a7e'
  			},
  			card: {
  				DEFAULT: '#1f1f1f',
  				light: '#333333',
  				lighter: '#515151',
  				lightest: '#646464',
  				hover: 'rgba(255,255,255,0.1)'
  			}
  		},
  		animation: {
  			'spin-fast': 'spin .5s linear infinite',
  		},
  		fontFamily: {
  			satoshi: 'var(--satoshi), sans-serif'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;