import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            inset: {
                "4.5": "18px"
            },
            spacing: {
                "0.75": "3px"
            },
            transitionDuration: {
                DEFAULT: "200ms"
            },
            transitionTimingFunction: {
                DEFAULT: "ease-in-out"
            }
        },
    },
    plugins: [
        plugin(({addComponents, theme}) => {

        })
    ],
}
