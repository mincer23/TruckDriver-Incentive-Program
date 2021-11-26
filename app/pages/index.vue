<template>
  <div>
    <Header page-title="Driver Dashboard" :header-image="getHeaderImage" />
    <SplashContainer
      :first-name="getUser.firstName"
      :last-name="getUser.lastName"
      :transactions="test_transactions"
      :balances="getUser.balances"
      :organizations="getUser.driverFor"
    />
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
          sponsor: 'Piers Morgan Financial',
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
    ...mapGetters([
      'getUser',
      'getHeaderImage'
    ])
  }
}
</script>
