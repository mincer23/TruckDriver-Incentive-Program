export const state = () => ({
  session: null
})

export const mutations = {
  setUser (state, user) {
    state.session = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    commit('setUser', req?.session?.user)
  }
}
