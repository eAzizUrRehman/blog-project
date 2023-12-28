export default function ({ app, store }) {
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    store.commit('SET_LOCALE', newLocale)
  }
}
