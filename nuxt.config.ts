// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: "The Official Wesbite for Ally Johnson's Questions",
        },
      ],
    },
  },
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
