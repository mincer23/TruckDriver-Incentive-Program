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
        <SplashCardContainer :transactions="transactions">
          {{ balance }}
        </SplashCardContainer>
      </b-col>
      <b-col cols="6">
        <SplashCardContainer
          bg-variant="secondary"
          :transactions="transactions"
          collapse-button-text="All Orders"
          header="Orders"
        >
          {{ "0" }}
        </SplashCardContainer>
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
    balance: {
      type: Number,
      required: true
    },
    transactions: {
      type: Array,
      required: false,
      default: Array
    }
  }
}
</script>

<style>

</style>
