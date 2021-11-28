<template>
  <div>
    <Header page-title="Admin Report" />
    <b-container>
      <b-row>
        <b-col>
          <b-card title="Organizations">
            <b-card title="Summary">
              <b-table striped hover :items="organizationSummaryData" :fields="summaryFields" />
            </b-card>
            <b-card title="Transactions">
              <b-table striped hover :items="organizationTransactionData" :fields="transactionFields" />
            </b-card>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card title="Drivers">
            <b-card title="Summary">
              <b-table striped hover :items="driverSummaryData" :fields="summaryFields" />
            </b-card>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card title="Invoices">
            <b-card>
              <b-table striped hover :items="orgInvoiceData" :fields="invoiceFields" />
            </b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import _ from 'lodash'
export default {
  fetchOnServer: false,
  data () {
    return {
      orgTransactions: [],
      purchaseCounts: [],
      driverPurchases: [],
      priorityDriver: null,
      priorityOrg: null,
      summaryFields: [
        { key: 'name', sortable: true },
        { key: 'total_points_spent', sortable: true },
        { key: 'total_dollar_amount_spent', sortable: true },
        { key: 'items_purchased', sortable: true }
      ],
      transactionFields: [
        { key: 'item', sortable: true },
        { key: 'price', sortable: true },
        { key: 'times_purchased', sortable: true }
      ],
      invoiceFields: [
        { key: 'name', sortable: true },
        { key: 'total_fees', sortable: true },
        { key: 'total_bill', sortable: true }
      ]
    }
  },
  async fetch () {
    const data = await this.$http.$get('/api/organizations/transactions')
    this.orgTransactions = data.transactions
    this.purchaseCounts = data.purchaseCounts
    this.driverPurchases = data.driverPurchases
  },
  computed: {
    ...mapGetters(['getUser']),
    orgId () {
      return this.getUser.staffFor[0].id
    },
    organizationSummaryData () {
      const data = this.orgTransactions
      for (const org in data) {
        data[org].total_points_spent = 0
        data[org].items_purchased = 0
        for (const driver in data[org].drivers) {
          for (const log in data[org].drivers[driver].logs) {
            data[org].total_points_spent += Number(data[org].drivers[driver].logs[log]?.oldValue) - Number(data[org].drivers[driver].logs[log]?.newValue)
            data[org].items_purchased += 1
          }
        }
        data[org].total_dollar_amount_spent = '$' + String(Number(data[org].total_points_spent) / 1000)
      }
      return data
    },
    organizationTransactionData () {
      return this.purchaseCounts.map(elem => Object({
        item: elem.name,
        price: elem.price,
        times_purchased: elem._count.orders
      }))
    },
    driverSummaryData () {
      const data = this.driverPurchases
      for (const driver in data) {
        data[driver].total_points_spent = 0
        data[driver].items_purchased = 0
        data[driver].name = data[driver].firstName + ' ' + data[driver].lastName
        for (const order in data[driver].orders) {
          data[driver].total_points_spent += Number(data[driver].orders[order]?.event?.oldValue) - Number(data[driver].orders[order]?.event?.newValue)
          data[driver].items_purchased += data[driver].orders[order]._count.items
        }
        data[driver].total_dollar_amount_spent = '$' + String(Number(data[driver].total_points_spent) / 1000)
      }
      return data
    },
    orgInvoiceData () {
      const data = this.organizationSummaryData
      for (const org in data) {
        data[org].total_fees = 0.03 * (Number(data[org].total_points_spent) / 1000)
        data[org].total_bill = data[org].total_fees + (Number(data[org].total_points_spent) / 1000)
      }
      return data
    }
  }
}
</script>

<style scoped>

</style>
