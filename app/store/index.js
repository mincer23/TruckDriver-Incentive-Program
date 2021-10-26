export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
    
    loggedInUser(state) {
      return state.auth.user
    },

    driverUser(state) {
      return state.auth.driver
      },


    adminUser(state) {
      return state.auth.admin
  }
}
  