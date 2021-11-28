<template>
  <div>
    <Header page-title="All Organizations" :header-image="getHeaderImage" />
    <b-container>
      <b-row>
        <b-col v-for="org in organizations" :key="org.id" cols="12">
          <b-card>
            <b-card-title>
              <NuxtLink
                :to="'/organizations/' + org.id"
                class="text-decoration-none text-info"
              >
                {{ org.name }}  <img v-if="org.headerImage" :src="'/uploads/' + org.headerImage" class="headerImage">
              </NuxtLink>
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
                  <b-col v-if="userIsStaffForOrg(org.id)">
                    <b-row>
                      <b-col>
                        <b-button :to="'/organizations/manage/' + org.id" variant="info" block>
                          Manage
                        </b-button>
                      </b-col>
                      <b-col>
                        <b-button :to="'/organizations/' + org.id" variant="secondary" block>
                          View as Driver
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col v-else>
                    <b-button v-if="userIsDriverForOrg(org.id) && !userHasAppliedToOrg(org.id)" variant="success" disabled block>
                      Joined!
                    </b-button>
                    <b-button v-else-if="!userIsDriverForOrg(org.id) && userHasAppliedToOrg(org.id)" variant="info" disabled block>
                      Applied!
                    </b-button>
                    <b-button v-else variant="primary" block @click="applyToOrg(org)">
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
  data () {
    return {
      organizations: [],
      userApplications: []
    }
  },
  async fetch () {
    this.organizations = await this.$http.$get('/api/organizations')
    this.userApplications = await this.$http.$get('/api/users/' + this.getUser.id + '/applications')
  },
  computed: {
    ...mapGetters([
      'getUser',
      'getHeaderImage'
    ])
  },
  methods: {
    userIsDriverForOrg (orgId) {
      const userOrgsAsDriver = this.getUser?.driverFor.map(elem => elem.id)
      if (userOrgsAsDriver?.includes(orgId)) {
        return true
      } else {
        return false
      }
    },
    userHasAppliedToOrg (orgId) {
      const openApps = this.userApplications.filter(elem => elem.status === 'WAITING')
      const userAppOrgIds = openApps.map(elem => elem.organization.id)
      if (userAppOrgIds.includes(orgId)) { return true }
      return false
    },
    userIsStaffForOrg (orgId) {
      if (this.getUser.isAdmin) {
        return true
      }
      const userStaffOrgIds = this.getUser?.staffFor.map(elem => elem.id)
      if (userStaffOrgIds?.length > 0 && userStaffOrgIds.includes(orgId)) {
        return true
      } else {
        return false
      }
    },
    async applyToOrg (org) {
      org.state = false
      const data = {
        userId: this.getUser.id,
        orgId: org.id
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await this.$http.$post('/api/organizations/' + org.id + '/application', data)
        this.$fetch()
      } catch {
        console.log('error')
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
