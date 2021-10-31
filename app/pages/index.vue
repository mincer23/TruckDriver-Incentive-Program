<template>
  <div>
    <Header page-title="Driver Dashboard" />
    <div v-if="getUser">
      <SplashContainer
        :first-name="getUser.firstName"
        :last-name="getUser.lastName"
        :transactions="test_transactions"
        :balance="Number(40000)"
      />
    </div>
    <div v-else>
      <!-- TODO: Add some cool splash screen for non-logged in folks! -->
      <span>Please <b-button to="/login" variant="primary">Login</b-button> to view this page.</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      test_transactions: [
        {
          sponsor: 'The Meta',
          totalPoints: 42069,
          pointChange: 69,
          id: 3
        },
        {
          sponsor: 'The Meta',
          totalPoints: 42000,
          pointChange: 2000,
          id: 2
        },
        {
          sponsor: 'The Meta',
          totalPoints: 40000,
          pointChange: -420,
          id: 1
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>
