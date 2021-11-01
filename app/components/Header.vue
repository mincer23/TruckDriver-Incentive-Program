<template>
  <b-navbar variant="light" type="light" class="mb-3">
    <b-navbar-brand class="text-black font-weight-bold">
      {{ pageTitle }}
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto align-items-center">
      <b-nav-item>
        <b-icon-search />
      </b-nav-item>
      <b-nav-item class="bordered mr-5">
        <b-icon-bell-fill class="mr-4" />
      </b-nav-item>
      <!-- temporary -->
      <b-nav-item to="/profilePage">
        Profile
      </b-nav-item>
      <!-- temporary -->
      <b-nav-item to="/signupPage">
        Sign Up
      </b-nav-item>
      <b-nav-item to="/applications">
        Applications
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown v-if="getUser" right>
        <template #button-content>
          {{ getUser.firstName }} {{ getUser.lastName }} <b-avatar src="https://placekitten.com/300/300" class="mr-1" /> {{ getUser.name }}
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
  props: {
    pageTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style scoped>
  .bordered {
    border-right: 2px solid lightgrey;
  }
</style>
