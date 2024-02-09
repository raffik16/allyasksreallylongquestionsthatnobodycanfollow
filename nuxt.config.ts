// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    "/": { prerender: true },
  },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Barlow: [400],
    },
  },
});
