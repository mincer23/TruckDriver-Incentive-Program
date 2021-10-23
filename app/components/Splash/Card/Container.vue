<template>
  <b-card
    :bg-variant="bgVariant"
    :text-variant="textVariant"
    class="text-center"
    :header="header"
    header-class="h3"
  >
    <b-card-text>
      <span class="h2"><slot /></span>
    </b-card-text>

    <b-button v-b-toggle.balance-collapse variant="info" class="mb-3">
      {{ collapseButtonText }}
    </b-button>

    <SplashCardCollapseContainer
      v-if="transactions.length > 0"
      id="balance-collapse"
      :transactions="transactions"
    />
  </b-card>
</template>

<script>
export default {
  props: {
    collapseButtonText: {
      type: String,
      default: 'Recent History'
    },
    header: {
      type: String,
      default: 'Point Balance'
    },
    bgVariant: {
      type: String,
      default: 'success'
    },
    textVariant: {
      type: String,
      default: 'white'
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
