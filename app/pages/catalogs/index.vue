<template>
  <div>
    <Header page-title="Catalog Selection" :header-image="getHeaderImage" />
    <b-container>
      <b-row v-for="org in driverFor" :key="org.id">
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
                  <b-button :to="'/catalogs/' + org.catalog.id" variant="info" block>
                    Browse
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-for="org in staffFor" :key="org.id">
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
                <b-col cols="2">
                  <b-button :to="'/catalogs/manage/' + org.catalog.id" variant="info" block>
                    Manage
                  </b-button>
                </b-col>
                <b-col cols="2">
                  <b-button :to="'/catalogs/' + org.catalog.id" variant="secondary" block>
                    Browse as Driver
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
    return { driverFor: result.driverFor, staffFor: result.staffFor }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  }
}
</script>

<style>

</style>
