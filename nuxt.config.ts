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
  modules: ['@nuxtjs/tailwindcss','@vite-pwa/nuxt','@pinia/nuxt','@nuxtjs/color-mode'],

  // TailwindCSS is only there because for some reason when I remove it everything breaks.
  // We'll only use plain CSS in this project, though; TailwindCSS often results in
  // very long class names that are hard to read and maintain.
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.ts',
  },

  css: ['~/assets/css/style.css'],

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

  appConfig: {
    apikey: process.env.SUPABASE_API_KEYS,
    baseUrl: process.env.SUPABASE_URL,
    secretKey: process.env.SUPABASE_SECRETS_KEY,
    storageUrl: process.env.SUPABASE_STORAGE_URL,
    baseStorageUrl: process.env.SUPABASE_GET_STORAGE_URL,
  },
})
