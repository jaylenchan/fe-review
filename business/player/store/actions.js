import { playMode } from '../config/player'

const playerActions = {
  resetSomeState({ commit }) {
    commit('setPlayMode', playMode.AUTO)
    commit('setCurrentTime', 0)
  }
}

export default playerActions
