<template>
  <div class="card">
    <div class="card-body">
      <br>
      <h1 class="card-title text-center">Forgot Password</h1>
      <form method="post">
        <br>
        <div class="username">
          <label>Please enter your username</label>
          <input v-model="userName" type="text" class="form-control" placeholder="Username" required>
        </div>
        <br>
        <label for="security-question">Select Your Security Question</label>
        <select class="form-control" id="security-question">
          <option selected>Choose question...</option>
          <option value="0">What was your first car?</option>
          <option value="1">What was the name of your first pet?</option>
          <option value="2">What high school did you attend?</option>
          <option value="3">What is your dream job?</option>
          <option value="4">What is the name of your favorite sports team?</option>
        </select>
        <br>
        <label for="answer">Security Question Answer</label>
        <input v-model="answer" type="text" class="form-control" placeholder="Type your answer..." required>
        <br>
        <button type="submit" class="btn btn-primary btn-lg btn-square">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
//  import { mapMutations } from 'vuex'
export default {
  layout: 'signedout',
  data () {
    return {
      userName: this.userName
      // question: security-question.value
    }
  }// ,
/*  methods: {
    ...
    async onSumbit(event) {
      event.preventDefault()
      const data = {
        email: this.email
      }
      const result = await this.$http.$post('/api/', data)
    } */
}
</script>

<style scoped>
.card {
  margin: auto;
  width: 500px;
}
</style>
