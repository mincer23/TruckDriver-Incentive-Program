<template>
  <div class="card">
    <div class="card-body">
      <h1 class="card-title text-center">Forgot Password</h1>
      <form method="post">
        <br>
        <div class="email">
          <label>Please enter the email for your account</label>
          <input v-model="email" type="text" class="form-control" placeholder="you@example.com..." required>
        </div>
        <p></p>
        <button type="submit" class="btn btn-primary btn-lg btn-square">Submit</button>
      </form>
    </div>
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
.card {
  margin: auto;
  width: 500px;
}
</style>
