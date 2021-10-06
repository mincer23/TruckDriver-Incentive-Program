<template>
  <b-navbar variant="dark" type="dark">
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
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown v-if="session" right>
        <template #button-content>
          <b-avatar src="https://placekitten.com/300/300" class="mr-1" /> {{ session.name }}
        </template>
        <b-dropdown-item :to="'/user/' + session.id">
          Account
        </b-dropdown-item>
        <b-dropdown-item href="/settings">
          Settings
        </b-dropdown-item>
        <b-dropdown-item href="/api/logout">
          Logout
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item v-else to="/login">
        <b-button variant="primary">Login</b-button>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['session'])
  }
}
</script>

<style>

</style>
