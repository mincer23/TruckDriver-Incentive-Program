<template>
  <div>
    <Header page-title="Pending Applications" :header-image="getHeaderImage" />
    <div>
      <b-container>
        <b-row
          v-for="app in applications"
          :key="app.id"
          align-v="center"
        >
          <b-col cols="12">
            <b-card>
              <b-container>
                <b-row align-v="center">
                  <b-col cols="8">
                    <b-container>
                      <b-row>
                        <NuxtLink :to="'/users/' + app.user.id">
                          <b-col>
                            <span class="p-0 m-0 text-dark text-decoration-none">Applicant: </span>
                            <b>{{ app.user.firstName + ' ' + app.user.lastName }}</b>
                          </b-col>
                        </NuxtLink>
                        <b-col>
                          Joined: <b>{{ new Date(app.user.joined).toLocaleDateString('en-US') }}</b>
                        </b-col>
                        <b-col>
                          Submitted: <b>{{ new Date(app.submitted).toLocaleDateString('en-US') }}</b>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-col>
                  <b-col cols="2">
                    <b-button variant="success" block @click="handleApplication(app.id)">
                      Accept
                    </b-button>
                  </b-col>
                  <b-col cols="2">
                    <b-button variant="danger" block @click="handleApplication(app.id, accept = false)">
                      Reject
                    </b-button>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData ({ $http, params }) {
    const applications = await $http.$get('/api/organizations/' + params.orgId + '/applications')
    return { applications, orgId: params.orgId }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  },
  methods: {
    async handleApplication (appId, accept = true) {
      const result = await this.$http.$put('/api/organizations/' + this.orgId + '/applications/' + appId, { accept })
      if (result && accept) {
        alert('Successfully accepted application!')
      } else if (result && !accept) {
        alert('Successfully denied application.')
      } else {
        alert('There was an error :(')
      }
    }
  }
}
</script>

<style>

</style>
