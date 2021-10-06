<template>
  <b-collapse v-if="transactions && transactions.length > 0" :id="id">
    <b-container class="text-dark bg-dark">
      <b-row v-for="entry in transactions" :key="entry.id">
        <b-col>
          <SplashCardCollapseEntry
            :total-points="entry.totalPoints"
            :point-change="entry.pointChange"
            :sponsor="entry.sponsor"
          />
        </b-col>
      </b-row>
    </b-container>
    <b-button variant="secondary" class="mt-3" to="/audit/user">
      View Full History
    </b-button>
  </b-collapse>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
