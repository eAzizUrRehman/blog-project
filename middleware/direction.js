export default function ({ store }) {
  if (process.client) {
    store.watch(
      (state) => state.dir,
      (newDir) => {
        document.documentElement.setAttribute('dir', newDir)
      },
    )
  }
}