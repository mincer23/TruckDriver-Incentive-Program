<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Applications</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ data.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ data.email }}
        </p>
        <p>
          <strong>Organization:</strong>
          {{ data.sponsor }}
        </p>

      </div>

    </div>
  </section>
</template>

<script>

export default {

  data () {
    return {
      data: ''
    }
  },

  async fetch () {
    this.data = await this.router.get('/profile/:id')
    ensureSponsor
  }

}
</script>
