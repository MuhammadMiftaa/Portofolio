const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const flowbite = require("flowbite-react/tailwind");
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
  	extend: {
  		colors: {
  			// background: 'var(--background)',
  			// foreground: 'var(--foreground)',
  			// 'color-1': 'hsl(var(--color-1))',
  			// 'color-2': 'hsl(var(--color-2))',
  			// 'color-3': 'hsl(var(--color-3))',
  			// 'color-4': 'hsl(var(--color-4))',
  			// 'color-5': 'hsl(var(--color-5))',
  			'primary': '#121212',
  			'color-1': '#FF00AA',
  			'color-2': '#00FFF1',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			rainbow: 'rainbow var(--speed, 2s) infinite linear',
  			'background-position-spin': 'background-position-spin 3000ms infinite alternate'
  		},
  		keyframes: {
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			},
  			'background-position-spin': {
  				'0%': {
  					backgroundPosition: 'top center'
  				},
  				'100%': {
  					backgroundPosition: 'bottom center'
  				}
  			}
  		},
  		fontFamily: {
  			urbanist: ["Urbanist", "sans-serif"],
  			montserrat: ["Montserrat", "sans-serif"],
  			poppins: ["Poppins", "sans-serif"],
  			londrina: ["Londrina", "sans-serif"],
  			lora: ["Lora", "sans-serif"],
  			quicksand: ["Quicksand", "sans-serif"]
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    function addVariablesForColors({ addBase, theme }: any) {
      let allColors = flattenColorPalette(theme("colors"));
      let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    },
    flowbite.plugin(),
  ],
};
export default config;
