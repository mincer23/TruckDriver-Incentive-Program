<template>
  <div>
    <Header page-title="Driver Dashboard" :header-image="getHeaderImage" />
    <SplashContainer
      :first-name="getUser.firstName"
      :last-name="getUser.lastName"
      :balances="getUser.balances"
      :organizations="getUser.driverFor"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getUser',
      'getHeaderImage'
    ])
  }
}
</script>
