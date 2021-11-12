<template>
  <div>
    <Header page-title="All Organizations" :header-image="getHeaderImage" />
    <b-container>
      <b-row>
        <b-col v-for="org in organizations" :key="org.id" cols="12">
          <b-card>
            <b-card-title>
              {{ org.name }}  <img v-if="org.headerImage" :src="'/uploads/' + org.headerImage" class="headerImage">
            </b-card-title>
            <b-card-body>
              <b-container>
                <b-row class="align-items-center">
                  <b-col>
                    Members: {{ org._count.drivers }}
                  </b-col>
                  <b-col>
                    Founded: {{ new Date(org.created).toLocaleDateString("en-us") }}
                  </b-col>
                  <b-col>
                    <b-button v-if="userIsDriverForOrg(org.id)" variant="success" disabled block>
                      Joined!
                    </b-button>
                    <b-button v-else variant="primary" to="/organizations/1/apply" block>
                      Apply
                    </b-button>
                  </b-col>
                </b-row>
              </b-container>
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
  async asyncData ({ $http }) {
    const organizations = await $http.$get('/api/organizations')
    return { organizations }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    userIsDriverForOrg (orgId) {
      const userOrgsAsDriver = this.getUser.driverFor.map(elem => elem.id)
      if (userOrgsAsDriver.includes(orgId)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.headerImage {
  height: 2em;
  max-width: 100%;
  padding: 0;
  margin: 0;
  width: auto;
}
</style>
