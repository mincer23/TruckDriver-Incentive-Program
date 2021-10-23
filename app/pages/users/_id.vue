<template>
  <b-container v-if="userData">
    <b-row>
      <b-col cols="5">
        <b-card
          bg-variant="light"
          text-variant="white"
          class="text-center"
          img-left
        >
          <b-card-header class="bg-primary">
            <b-row align-v="center" align-h="center" no-gutters>
              <b-col cols="4">
                <b-avatar src="https://placekitten.com/300/300" size="6em" />
              </b-col>
              <b-col cols="8">
                <h2>{{ userData.name }}</h2>
                <h6 v-for="sponsor in userData.sponsors" :key="sponsor.id">
                  Driver for <NuxtLink :to="'/sponsor/' + sponsor.id" class="text-dark">
                    {{ sponsor.name }}
                  </NuxtLink>
                </h6>
              </b-col>
            </b-row>
          </b-card-header>
          <b-card-body class="text-dark">
            <p>More Info About User Here</p>
          </b-card-body>
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
      userData = await $http.$get('api/users/profile/' + searchId)
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
