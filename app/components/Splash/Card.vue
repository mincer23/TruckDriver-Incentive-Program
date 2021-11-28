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

    <b-button :to="buttonTo" variant="info" class="mb-3">
      {{ buttonText }}
    </b-button>
  </b-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '0'
    },
    buttonText: {
      type: String,
      default: 'Recent History'
    },
    buttonTo: {
      type: String,
      default: '/points'
    },
    header: {
      type: String,
      default: 'Point Balances'
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
