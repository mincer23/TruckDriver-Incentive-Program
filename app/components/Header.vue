<template>
  <b-navbar variant="dark" type="dark" class="mb-3">
    <b-navbar-brand>
      <NuxtLink to="/" class="text-decoration-none text-white">
        Team8 Rewards
      </NuxtLink>
    </b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item to="/catalog">
        Catalog
      </b-nav-item>
      <b-nav-item to="/sponsors">
        Organizations
      </b-nav-item>
      <!-- temporary -->
      <b-nav-item to="/profilePage">
        Profile
      </b-nav-item>
      <!-- temporary -->
      <b-nav-item to="/signupPage">
        Sign Up
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown v-if="getUser" right>
        <template #button-content>
          <b-avatar src="https://placekitten.com/300/300" class="mr-1" /> {{ getUser.name }}
        </template>
        <b-dropdown-item :to="'/users/' + getUser.id">
          Account
        </b-dropdown-item>
        <b-dropdown-item href="/settings">
          Settings
        </b-dropdown-item>
        <b-dropdown-item href="/api/logout">
          Logout
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item v-else>
        <b-button variant="primary" to="/login">
          Login
        </b-button>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style>

</style>
