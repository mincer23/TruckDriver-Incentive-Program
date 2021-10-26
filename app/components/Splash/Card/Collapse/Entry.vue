<template>
  <b-card :bg-variant="background" class="my-1">
    {{ pointChange }} points ({{ totalPoints }})
  </b-card>
</template>

<script>
export default {
  props: {
    sponsor: {
      type: String,
      required: true
    },
    totalPoints: {
      type: Number,
      required: true
    },
    pointChange: {
      type: Number,
      required: true
    }
  },
  computed: {
    background () {
      if (this.pointChange > 0) {
        return 'success'
      } else {
        return 'danger'
      }
    }
  }
}
</script>

<style>

</style>
