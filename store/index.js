import VuexPersistence from 'vuex-persist'
import * as stateContent from './modules/home/state.js'
import actionsContent from './modules/home/actions.js'
import mutationsContent from './modules/home/mutations.js'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})
export default {
  state() {
    return stateContent
  },
  actions: actionsContent,
  mutations: mutationsContent,
  plugins: [vuexLocal.plugin],
}
