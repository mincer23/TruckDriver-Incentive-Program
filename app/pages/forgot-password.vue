<template>
  <div class="card">
    <div class="card-body">
      <br>
      <h1 class="card-title text-center">Forgot Password</h1>
      <Notification class="error" v-if="strong!=true && newPassword!=null" :message="error_strong" />
      <Notification class="error" v-if="newPassword!=confirm" :message="error_password" />
      <Notification class="error" v-if="state" :message="error_wrong" />
      <form @submit="onSubmit">
        <br>
        <div class="username">
          <label>Please enter your username</label>
          <input v-model="userName" type="text" class="form-control" placeholder="Username" required>
        </div>
        <br>
        <label for="security-question">Select Your Security Question</label>
        <select v-model="question" name="question" class="form-control" required>
          <option value=null>Choose question...</option>
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
        <label for="newPassword">New Password</label>
        <input
          v-model="newPassword"
          v-on:input="isPasswordStrong"
          type="password"
          class="form-control"
          placeholder="New password"
        >
        <client-only>
            <Password v-model="newPassword" :strength-meter-only="true" />
        </client-only>
        <label for="confirm">Confirm Password</label>
        <input v-model="confirm" type="password" class="form-control" placeholder="Retype password" required>
        <br>
        <button :disabled="newPassword!=confirm || strong!=true" type="submit" class="btn btn-primary btn-lg btn-square">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Password from '~/node_modules/vue-password-strength-meter'
import Notification from '~/components/Notification'
import zxcvbn from '~/node_modules/zxcvbn'
export default {
  components: {
    Notification,
    Password
  },
  layout: 'signedout',
  data () {
    return {
      userName: this.userName,
      question: null,
      answer: this.answer,
      newPassword: null,
      confirm: null,
      error_password: 'Passwords do not match',
      error_strong: 'Password is too weak',
      error_wrong: 'Incorrect username, question, or answer',
      strong: null,
      state: null
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      const data = {
        userName: this.userName,
        question: this.question,
        answer: this.answer,
        newPassword: this.newPassword
      }

      try {
        const result = await this.$http.$post('/api/users/forgotPassword', data)
        this.setUser(result)
        this.$nextTick(() => {
          this.$router.push('/')
        })
      } catch {
        this.state = false
      }
    },
    isPasswordStrong () {
      if (zxcvbn(this.newPassword).score > 2) {
        this.strong = true
      } else {
        this.strong = false
      }
    }
  }
}
</script>

<style scoped>
.card {
  margin: auto;
  width: 500px;
}
.error {
  margin: 10px 0px;
  padding: 20px;
  color: #D8000C;
  background-color: #FFD2D2;
  border: 1px solid;
  box-shadow: 1px 1px 3px #888;
  border-radius: .5em;
  text-align: center;
}
</style>
