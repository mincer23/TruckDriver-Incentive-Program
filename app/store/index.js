export const state = () => ({
  session: null,
  displayMode: 'light',
  cart: [],
  cartOrgId: null
})

export const mutations = {
  setUser (state, user) {
    state.session = user
  },

  setDisplayMode (state, mode) {
    state.displayMode = mode
  },

  addToCart (state, { item, orgId }) {
    state.cart.push(item)
    state.cartOrgId = orgId
  },

  removeFromCart (state, itemId) {
    const i = state.cart.map(item => item.id).indexOf(itemId)
    state.cart.splice(i, 1)
    if (state.cart.length === 0) {
      state.cartOrgId = null
    }
  },

  emptyCart (state) {
    state.cart = []
    state.cartOrgId = null
  }
}

export const getters = {
  getUser: (state) => {
    return state.session
  },

  getHeaderImage: (state) => {
    if (state.session?.staffFor?.length > 0 && state.session?.staffFor[0].headerImage) {
      return state.session.staffFor[0].headerImage
    } else if (state.session.driverFor.length > 0) {
      return state.session.driverFor[0].headerImage
    } else {
      return null
    }
  },

  getCart: (state) => {
    return state.cart
  },

  // eslint-disable-next-line arrow-parens
  cartContainsItem: (state) => (itemId) => {
    const cartIds = state.cart.map(elem => elem.id)
    if (cartIds.includes(itemId)) {
      return true
    } else {
      return false
    }
  },

  getCartOrgId: (state) => {
    return state.cartOrgId
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    commit('setUser', req?.session?.user)
  }
}
