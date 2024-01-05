import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            "mobile": {"max": "460px"}
        },
        extend: {
            spacing: {
                "0.75": "3px"
            },
            transitionDuration: {
                DEFAULT: "200ms"
            },
            transitionTimingFunction: {
                DEFAULT: "ease-in-out"
            },
            width: {
                "300": "1200px",
                "110": "440px",
                "100": "100vw"
            },
            height: {
                "110": "440px"
            },
            minHeight: {
                "100": "100vh"
            },
            gridTemplateRows: {
                "cd-head": "3fr 2fr"
            },
            backgroundColor: {
                modal: "rgba(0,0,0,0.4)"
            },
            fontSize: {
                "0": "0px"
            }
        },
    },
    plugins: [
        plugin(({addComponents, theme}) => {
            addComponents({
                ".btn-primary": {
                    backgroundColor: theme("colors.blue.600"),
                    color: theme("colors.blue.50"),
                    fontSize: "18px",
                    lineHeight: "28px",
                    borderRadius: "6px",
                    fontWeight: "500",
                    borderWidth: "1px",
                    borderColor: theme("colors.blue.800"),
                    transitionProperty: "all",
                    transitionDuration: "250ms",
                    transitionTimingFunction: "ease-in-out",


                    "&:hover": {
                        color: "white",
                        backgroundColor: theme("colors.blue.500"),
                        borderColor: theme("colors.blue.600"),
                    }
                }
            })
        }),

        plugin(({addComponents, theme}) => {
            addComponents({
                ".small-font": {
                    color: theme("colors.grey.800"),
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "24px"
                }
            })
        }),

        plugin(({addComponents, theme}) => {
            addComponents({
                ".big-font": {
                    color: theme("colors.grey.800"),
                    fontWeight: "700",
                    fontSize: "20px",
                    lineHeight: "28px"
                }
            })
        })
    ],
}

