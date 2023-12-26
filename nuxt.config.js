export default {
  ssr: false,
  head: {
    title: 'HiTech Blog - Tech Unleashed...!',
    htmlAttrs: {
      lang: 'en',
      dir: 'ltr',
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
    '@nuxtjs/axios',
    '@nuxtjs/auth',
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
      alwaysRedirect: true,
    },
    onLanguageSwitched: (oldLocale, newLocale) => {
      if (newLocale === 'ur') {
        document.documentElement.setAttribute('dir', 'rtl')
      } else {
        document.documentElement.setAttribute('dir', 'ltr')
      }
      // window.$nuxt.$store.commit('SET_LOCALE', newLocale)
    },
    lazy: true,
    langDir: 'locales/',
  },
  axios: {
    baseURL: 'http://localhost:3000/api',
  },
  build: {},
  router: {
    middleware: 'direction',
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
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/sessions',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post',
          },
          user: {
            url: '/sessions/user',
            method: 'get',
            propertyName: 'user',
          },
          register: {
            url: '/register',
            method: 'post',
          },
        },
        tokenType: 'Bearer',
      },
    },
  },
}
