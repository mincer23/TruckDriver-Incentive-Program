export const state = () => ({
  session: null,
  displayMode: 'light'
})

export const mutations = {
  setUser (state, user) {
    state.session = user
  },

  setDisplayMode (state, mode) {
    state.displayMode = mode
  }
}

export const getters = {
  getUser: (state) => {
    return state.session
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    commit('setUser', req?.session?.user)
  }
}
