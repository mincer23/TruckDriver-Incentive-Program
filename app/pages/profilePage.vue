<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ loggedInUser.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ loggedInUser.email }}
        </p>
      </div>

      <div class = "container">

        <div class="control">
          <button type="submit" class="button is-dark is-fullwidth">Leave Sponsor</button>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  // data() {
  //   return {
  //     sponsor: '',
  // }
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser'])
  }
}
</script>