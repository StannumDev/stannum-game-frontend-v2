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
  		// Escala de capas (z-index) centralizada. Antes había valores arbitrarios de 3 a 14
  		// dígitos sueltos y empatados; estos tokens ordenan todos los overlays fixed de la app.
  		zIndex: {
  			cta: '100',            // barras CTA fijas (ej. comprar programa)
  			fab: '150',            // FAB de STAN (despeja el nav por posición, no por z)
  			nav: '200',            // navbars mobile (header + bottom-nav)
  			tooltip: '250',        // tooltips
  			overlay: '300',        // overlays fullscreen (fin de lección, velo del buscador)
  			'overlay-top': '310',  // input del buscador (sobre su velo)
  			'chat-backdrop': '350',
  			chat: '360',           // panel del chat de STAN abierto
  			'modal-backdrop': '400',
  			modal: '410',          // Modal compartido + modales de comunidad
  			toast: '500',          // notificaciones (siempre arriba de todo)
  		},
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
  			'fade-in': 'fadeIn .3s ease-out',
  			// Nudge sutil para llamar la atención del FAB de STAN cuando hay respuesta sin leer:
  			// quieto la mayor parte del ciclo y un doble salto corto al final.
  			'stan-nudge': 'stanNudge 2.4s ease-in-out infinite',
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': { opacity: '0', transform: 'translateY(4px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  			stanNudge: {
  				'0%, 65%, 100%': { transform: 'translateY(0)' },
  				'75%': { transform: 'translateY(-6px)' },
  				'85%': { transform: 'translateY(-2px)' },
  			},
  		},
  		fontFamily: {
  			satoshi: 'var(--satoshi), sans-serif'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;