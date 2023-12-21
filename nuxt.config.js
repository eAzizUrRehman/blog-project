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
    '@nuxtjs/i18n',
    '@nuxtjs/auth',
    'vue-toastification/nuxt',
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
        name: 'Urdu',
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
  build: {},
  router: {
    middleware: 'direction',
  },
  auth: {
    strategies: {
      // local: {
      //   endpoints: {
      //     login: {
      //       url: '/api/auth/login',
      //       method: 'post',
      //       propertyName: 'token',
      //     },
      //     logout: { url: '/api/auth/logout', method: 'post' },
      //     user: { url: '/api/auth/user', method: 'get', propertyName: 'user' },
      //   },
      //   tokenRequired: true,
      //   tokenType: 'bearer',
      // },
      google: {
        clientId: 'YourClientID',
        codeChallengeMethod: 'S256', // or 'plain'
      },
    },
  },
}
