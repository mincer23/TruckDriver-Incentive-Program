<template>
  <nav class="navbar is-light">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">Driver Incentive Program</nuxt-link>
        <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              My Account
            </a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/profilePage">My Profile</nuxt-link>
              <hr class="navbar-divider"/>
              <a class="navbar-item" @click="logout" >Logout</a>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Sponsor</a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/sponsorRequest"> Request Sponsor</nuxt-link>
              <hr class="navbar-divider"/>
              <nuxt-link class="navbar-item" to="/sponsorOrgs"> Sponsor Organizations</nuxt-link>
            </div>
          </div>
          <template>
            <nuxt-link class="navbar-item" to="/signupPage">Register</nuxt-link>
            <nuxt-link class="navbar-item" to="/login">Log In</nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['loggedInUser'])
  }
}
</script>
