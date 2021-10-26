<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Sponsor Organizations</h2>
            <div class = "content" v-if="isAuthenticated && state.auth.user == sponsor">
       
            </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'sponsor',
  computed: {
    ...mapGetters(['loggedInUser'])
  }
}
</script>