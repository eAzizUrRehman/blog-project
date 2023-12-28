export default {
  ssr: false,
  head: {
    title: 'HiTech Blog - Tech Unleashed...!',
    // htmlAttrs: {
    //   lang: 'en',
    //   dir: 'ltr',
    // },
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
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'vue-toastification/nuxt',
    '@nuxtjs/sitemap',
    [
      'vue-toastification/nuxt',
      {
        timeout: 1500,
        draggable: true,
      },
    ],
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'ur',
        name: 'اردو',
        file: 'ur.json',
      },
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
      syncMessages: false,
      syncRouteParams: true,
    },
    lazy: true,
    strategy: 'no_prefix',
    langDir: 'locales/',
  },
  axios: {
    baseURL: 'http://localhost:3000/api',
  },
  build: {},
  router: {
    middleware: 'i18n',
  },
  sitemap: {
    hostname: 'https://yourwebsite.com',
    gzip: true,
    exclude: ['/secret', '/admin/**'],
    routes: [
      '/page/1',
      {
        url: '/page/2',
        changefreq: 'daily',
        priority: 1,
        lastmod: '2024-01-01T13:00:00.000Z',
      },
    ],
  },
}
