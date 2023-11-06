// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['vue-final-modal/style.css',"vuetify/lib/styles/main.sass", 
  "@mdi/font/css/materialdesignicons.css","@fortawesome/fontawesome-svg-core/styles.css"],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss",'@vueuse/nuxt'],
  build: {
    transpile: [
      "vuetify"
    ],
  },
})
