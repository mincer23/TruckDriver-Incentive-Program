<template>
  <div>
    <Header page-title="Organization Report" />
    <b-container>
      <b-row>
        <b-col>
          <b-card title="Driver Point Changes">
            <b-table striped hover :items="realData" />
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
      pointEvents: []
    }
  },
  async fetch () {
    this.pointEvents = await this.$http.$get('/api/organizations/' + this.orgId + '/events')
  },
  computed: {
    ...mapGetters(['getUser']),
    orgId () {
      return this.getUser.staffFor[0].id
    },
    realData () {
      return this.pointEvents.map(elem => Object({
        driver_name: String(elem.user.firstName + ' ' + elem.user.lastName),
        total_points: elem.balance.balance,
        date_of_change: new Date(elem.time).toLocaleDateString(),
        name_of_changer: elem.balance.organization.name,
        point_change: Number(Number(elem.newValue) - Number(elem.oldValue)),
        reason: elem.reason ? (elem.reason === '' ? 'Manual Adjustment' : elem.reason) : 'Item Purchase'
      }))
    }
  }
}
</script>

<style scoped>

</style>
