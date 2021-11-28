<template>
  <b-container>
    <b-row v-for="balance in balances" :key="balance.id" align-v="center">
      <b-col>
        <b-card :title="'Organization: ' + balance.organization.name">
          <b-container>
            <b-row align-v="center">
              <b-col class="d-flex justify-content-end">
                <b>Current Balance: {{ balance.balance }}</b>
              </b-col>
              <b-col>
                <form @submit="onSubmit">
                  <label :for="'ele-' + userId">Enter the amount of points to give (negative for deductions)</label>
                  <input
                    :id="'ele-' + userId"
                    type="number"
                    name="change"
                    placeholder="Amount..."
                    :min="'-' + balance.balance"
                    required
                  >
                  <input type="hidden" name="orgId" :value="balance.organization.id">
                  <b-button type="submit">Adjust</b-button>
                </form>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  fetchOnServer: false,
  props: {
    userId: {
      type: Number,
      required: true
    },
    thisOrg: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      balances: [],
      amount: null
    }
  },
  async fetch () {
    if (this.thisOrg) {
      this.balances = [await this.$http.$get('/api/users/' + this.userId + '/' + this.thisOrg + '/points')]
    } else {
      this.balances = await this.$http.$get('/api/users/' + this.userId + '/transactions')
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      const orgId = event.target.orgId.value
      const data = {
        change: Number(event.target.change.value)
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await this.$http.$post('/api/users/' + this.userId + '/' + orgId + '/points', data)
        console.log(result)
        this.$fetch()
      } catch {
        this.state = false
      }
    }
  }
}
</script>

<style>

</style>
