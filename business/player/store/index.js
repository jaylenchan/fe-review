import playerState from './state'
import playerGetters from './getters'
import playerMutations from './mutations'
import playerActions from './actions'

export default {
  namespaced: true,
  state: playerState,
  getters: playerGetters,
  mutations: playerMutations,
  actions: playerActions
}
