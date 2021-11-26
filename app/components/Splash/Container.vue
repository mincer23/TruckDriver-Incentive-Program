<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Welcome back, <span class="text-primary">{{ firstName }}</span>.</h1>
        <hr class="p-0">
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <SplashCard
          :transactions="transactions"
          button-text="All Points"
        >
          <b-container fluid>
            <b-row v-for="balance in balances" :key="balance.organization.id" no-gutters>
              <b-col cols="10">
                <NuxtLink class="text-primary text-decoration-none" to="/organizations/1">
                  {{ balance.organization.name }}
                </NuxtLink>
              </b-col>
              <b-col cols="2">
                <b-badge>{{ balance.balance }}</b-badge>
              </b-col>
            </b-row>
            <b-row v-if="balances.length === 0" no-gutters>
              <b-col cols="12">
                Not a member of any organization. <NuxtLink to="/organizations">Join one to get started!</NuxtLink>
              </b-col>
            </b-row>
          </b-container>
        </SplashCard>
      </b-col>
      <b-col cols="6">
        <SplashCard
          id="1"
          bg-variant="secondary"
          :transactions="transactions"
          button-text="All Orders"
          header="Orders"
          button-to="/orders"
        >
          {{ transactions.length }}
        </SplashCard>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    firstName: {
      type: String,
      required: true
    },
    balances: {
      type: Array,
      required: true
    },
    transactions: {
      type: Array,
      required: false,
      default: Array
    },
    organizations: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
