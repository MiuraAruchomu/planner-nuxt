// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['~/assets/styles/main.scss'],
  modules: ['@pinia/nuxt', 'nuxt-vuefire', '@nuxt/icon'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      databaseURL: process.env.DATABASE_URL,
    },
    services: {
      database: true,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/_variables.scss";
            @import "@/assets/styles/_mixins.scss";
            @import "@/assets/styles/_fonts.scss";
          `,
        },
      },
    },
  },
});
