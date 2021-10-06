<template>
  <b-container v-if="userData">
    <b-row>
      <b-col cols="6">
        <b-card
          bg-variant="success"
          text-variant="white"
          class="text-center"
          header="Balance"
          header-class="h3"
        >
          <b-card-text>
            <span class="h2">400000</span>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData ({ req, $http, route }) {
    let searchId
    if (route.params.id) {
      searchId = route.params.id
    } else if (req?.session?.user?.id) {
      searchId = req.session.user.id
    } else {
      searchId = null
    }

    let userData
    if (searchId) {
      userData = await $http.$get('api/user/profile/' + searchId)
    }
    return { userData, searchId }
  },
  computed: {
    ...mapState(['session'])
  }
}
</script>

<style>

</style>
