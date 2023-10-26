// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" }
      ]
    }
  },

  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@vite-pwa/nuxt'],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.ts',
  },

  pwa: {
    manifest: {
      name: "ecommerce",
      short_name: "ecommerce",
      theme_color: "#fff",
      background_color: "#fff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "favicon.ico",
          sizes: "32x32",
          type: "image/x-icon"
        },
      ]
    },
    devOptions: { enabled: true },
  },
})
