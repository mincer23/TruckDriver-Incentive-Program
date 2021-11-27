<template>
  <div>
    <Header page-title="My Applications" :header-image="getHeaderImage" />
    <b-container>
      <b-row v-if="getUser.staffFor.length > 0" class="pb-3">
        <b-col v-for="org in getUser.staffFor" :key="org.id" cols="12">
          <b-button :to="'/organizations/applications/' + org.id" block>Manage Applications for {{ org.name }}</b-button>
        </b-col>
      </b-row>
      <b-row v-for="app in myApplications" :key="app.id">
        <b-col>
          <b-card :title="app.organization.name">
            <b-container>
              <b-row>
                <b-col>
                  Submitted: {{ new Date(app.submitted).toLocaleString() }}
                </b-col>
                <b-col>
                  Status: <b-badge :variant="badgeVariant(app.status)">{{ app.status }}</b-badge>
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
  data () {
    return {
      myApplications: []
    }
  },
  async fetch () {
    this.myApplications = await this.$http.$get('/api/users/' + this.getUser.id + '/applications')
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  },
  methods: {
    badgeVariant (status) {
      if (status === 'WAITING') {
        return 'secondary'
      }
      if (status === 'ACCEPTED') {
        return 'success'
      }
      if (status === 'DENIED') {
        return 'danger'
      }
      if (status === 'RESCINDED') {
        return 'dark'
      }
    }
  }
}
</script>

<style>

</style>
