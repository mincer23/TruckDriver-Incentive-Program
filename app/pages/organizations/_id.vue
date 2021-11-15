<template>
  <div>
    <Header :page-title="'Manage ' + orgData.name" :header-image="getHeaderImage" />
    <b-container>
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
                  <h2>{{ orgData.name }}</h2>
                  <h6>Founded: {{ new Date(orgData.created).toLocaleDateString('en-US') }}</h6>
                </b-col>
              </b-row>
            </b-card-header>
            <b-card-body class="text-dark">
              <p>Flavor text about this org or something</p>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData ({ $http, route }) {
    const orgData = await $http.$get('/api/organizations/' + route.params.id)
    return { orgData }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  }
}
</script>

<style>

</style>
