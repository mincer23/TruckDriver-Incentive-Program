<template>
  <div class="forgot-password">
    <form method="post">
      <h1>Forgot Password</h1>
      <p></p>
      <div class="email">
        <label>Please enter the email for your account</label>
        <input v-model="email" type="email" class="form-control" placeholder="you@example.com..." required>
      </div>
      <p></p>
      <button type="submit" class="btn btn-primary btn-lg btn-square">Submit</button>
    </form>
  </div>
</template>

<script>
/* import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      email: null
    }
  },
  methods: {
    ...
    async onSumbit(event) {
      event.preventDefault()
      const data = {
        email: this.email
      }
      const result = await this.$http.$post('/api/', data)
  } */
</script>

<style scoped>

</style>
