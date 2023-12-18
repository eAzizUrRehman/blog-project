export default {
  ssr: false,
  head: {
    title: 'HiTech Blog - Tech Unleashed',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }],
  },
  css: [],
  plugins: [{ src: '~/plugins/vue-toastification.js', ssr: false }],
  components: true,
  buildModules: ['@nuxtjs/tailwindcss'],
  modules: [
    'vue-toastification/nuxt',
    [
      'vue-toastification/nuxt',
      {
        timeout: 1500,
        draggable: true,
      },
    ],
  ],
  build: {},
}
