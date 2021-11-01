<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ getUser.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ getUser.email }}
        </p>
        <p>
          <strong>Organization:</strong>
          {{ getUser.sponsor }}
        </p>
      </div>

      <div class = "container">

        <div class="control">
          <button type="submit" class="btn btn-primary btn-lg btn-square">Leave Sponsor</button>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {

  // data () {
  //   return {
  //     sponsor: '',
  //     state: null
  //   }
  // },

  // middleware: 'auth',
  methods: {
    ...mapMutations(['getUser'])
  }
}
</script>
