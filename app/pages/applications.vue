<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Applications</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ getUser.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ getUser.email }}
        </p>
        <p>
          <strong>Organization:</strong>
          {{ getUser.sponsor }}
        </p>

         <p>
          <strong>Status:</strong>
          {{ getUser.Status }}
        </p>
      </div>

    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {

  methods: {
    ...mapMutations(['getUser'])
  }
}
</script>
