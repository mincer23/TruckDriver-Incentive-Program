<template>
  <b-container>
    <b-row>
      <b-col cols="6">
        <SplashCardContainer :transactions="transactions">
          {{ balance }}
        </SplashCardContainer>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
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
