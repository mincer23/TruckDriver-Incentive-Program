<template>
  <div>
    <Header page-title="Catalog Selection" :header-image="getHeaderImage" />
    <b-container>
      {{ catalogs }}
      <b-row v-for="org in organizations" :key="org.id">
        <b-col cols="12">
          <b-card>
            <b-container>
              <b-row>
                <b-col cols="8">
                  <h4>
                    <NuxtLink :to="'/organizations/' + org.id" class="text-decoration-none">
                      {{ org.name }}
                    </NuxtLink>
                  </h4>
                </b-col>
                <b-col cols="4">
                  <b-button :to="'/catalogs/' + org.catalog.id" variant="info">
                    Browse
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData ({ $http, store }) {
    const result = await $http.$get('/api/users/' + store.state.session.id + '/catalogs')
    return { organizations: result.driverFor }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  }
}
</script>

<style>

</style>
