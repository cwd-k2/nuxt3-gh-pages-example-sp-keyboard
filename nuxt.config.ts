import { defineNuxtConfig } from "nuxt";
const deployTarget = process.env.NODE_ENV || "development";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: "static",
  app: {
    baseURL: deployTarget === "gh-pages" ? "/nuxt3-gh-pages-example-sp-keyboard/" : "/",
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/uikit@3.14.1/dist/css/uikit.min.css",
        },
      ],
      script: [
        { src: "https://cdn.jsdelivr.net/npm/uikit@3.14.1/dist/js/uikit.min.js" },
        { src: "https://cdn.jsdelivr.net/npm/uikit@3.14.1/dist/js/uikit-icons.min.js" },
      ],
    },
  },
});
