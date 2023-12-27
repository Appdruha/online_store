/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            top: {
                'min0.5': '-2px'
            }
        },
    },
    plugins: [],
}

