<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ userData.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ userData.email }}
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
import { mapMutations } from 'vuex'
export default {

  data () {
    return {
      sponsor: '',
      state: null
    }
  },

  // middleware: 'auth',
  methods: {
    ...mapMutations(['setUser'])
  }
}
</script>
