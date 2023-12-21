// middleware/direction.js
export default function ({ app }) {
  const dir = app.i18n.locale === 'ur' ? 'rtl' : 'ltr'
  if (process.client) {
    document.documentElement.setAttribute('dir', dir)
  }
}
