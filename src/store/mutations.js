import * as types from './mutation-types'

const mutations = {
  [types.SET_GOODS](state, vgoods) {
    state.vgoods = vgoods
  }
}

export default mutations
