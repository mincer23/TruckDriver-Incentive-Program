<template>
  <div>
    <Header page-title="Organization Report" />
    <b-container>
      <b-row>
        <b-col>
          <b-form-select v-model="priorityDriver" :options="drivers" class="mb-3" />
          <b-card title="Driver Point Changes">
            <b-table striped hover :items="realData" :fields="fields" />
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
      pointEvents: [],
      priorityDriver: null,
      fields: [
        { key: 'driver_name', sortable: true },
        { key: 'point_change', sortable: true },
        { key: 'total_points', sortable: true },
        { key: 'date_of_change', sortable: true },
        { key: 'name_of_changer', sortable: true },
        { key: 'reason', sortable: true }
      ]
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
      let data = this.pointEvents
      if (this.priorityDriver) {
        data = this.pointEvents.filter(elem => elem.user.id === this.priorityDriver)
      }
      return data.map(elem => Object({
        driver_name: String(elem.user.firstName + ' ' + elem.user.lastName),
        total_points: elem.balance.balance,
        date_of_change: new Date(elem.time).toLocaleDateString(),
        name_of_changer: elem.balance.organization.name,
        point_change: Number(Number(elem.newValue) - Number(elem.oldValue)),
        reason: elem.reason ? (elem.reason === '' ? 'Manual Adjustment' : elem.reason) : 'Item Purchase'
      }))
    },
    drivers () {
      const drivers = this.pointEvents.map(elem => Object({
        value: elem.user.id,
        text: String(elem.user.firstName + ' ' + elem.user.lastName)
      }))
      drivers.push({ value: null, text: 'Filter by driver...' })
      return drivers
    }
  }
}
</script>

<style scoped>

</style>
