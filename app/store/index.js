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
  },

  getHeaderImage: (state) => {
    if (state.session.staffFor.length > 0 && state.session.staffFor[0].headerImage) {
      return state.session.staffFor[0].headerImage
    } else if (state.session.driverFor.length > 0) {
      return state.session.driverFor[0].headerImage
    } else {
      return null
    }
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    commit('setUser', req?.session?.user)
  }
}
