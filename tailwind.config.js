/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            // "light",
            // "dark",
            // "cupcake",
            // "bumblebee",
            // "emerald",
            // "corporate",
            // "synthwave",
            // "retro",
            // "cyberpunk",
            // "valentine",
            // "halloween",
            // "garden",
            // "forest",
            // "aqua",
            // "lofi",
            // "pastel",
            // "fantasy",
            // "wireframe",
            // "black",
            // "luxury",
            // "dracula",
            // "cmyk",
            // "autumn",
            // "business",
            // "acid",
            // "lemonade",
            // "night",
            // "coffee",
            // "winter",
            // "dim",
            // "nord",
            // "sunset",
            {
                mytheme: {

                    "primary": "#00c2ff",

                    "secondary": "#00cdff",

                    "accent": "#00e400",

                    "neutral": "#151c1d",

                    "base-100": "#002c36",

                    "info": "#00b3ff",

                    "success": "#00983f",

                    "warning": "#c78b00",

                    "error": "#f24e71",
                },
            },
        ],
    },
    plugins: [
        require('daisyui'),
    ],
}