<template>
  <div>
    <Header page-title="Driver Dashboard" :header-image="getHeaderImage" />
    <b-container>
      <b-row v-for="balance in transactions" :key="balance.organization.id">
        <b-col>
          <b-card :title="balance.organization.name">
            <h4>
              Balance:
              <span :class="balance.balance >= 0 ? 'text-success' : 'text-danger'">
                {{ balance.balance }}
              </span>
            </h4>
            <b-collapse :id="'collapse-' + balance.organization.id">
              <b-container>
                <b-row>
                  <b-col cols="4">
                    Date
                  </b-col>
                  <b-col cols="4">
                    Amount
                  </b-col>
                  <b-col cols="4">
                    Reason
                  </b-col>
                </b-row>
                <b-row v-for="transaction in balance.events" :key="transaction.id">
                  <b-col cols="4">
                    {{ new Date(transaction.time).toLocaleString() }}
                  </b-col>
                  <b-col cols="4" :class="transaction.newValue - transaction.oldValue > 0 ? 'text-success' : 'text-danger'">
                    <b>{{ transaction.newValue - transaction.oldValue }}</b>
                  </b-col>
                  <b-col cols="4">
                    {{ transaction.reason }}
                  </b-col>
                </b-row>
              </b-container>
            </b-collapse>
            <b-button variant="info" v-b-toggle="'collapse-' + balance.organization.id">Show all changes</b-button>
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
      transactions: []
    }
  },
  async fetch () {
    this.transactions = await this.$http.$get('/api/users/' + this.getUser.id + '/transactions')
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  }
}
</script>

<style>

</style>
