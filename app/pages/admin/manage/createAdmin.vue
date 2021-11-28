<template>
  <div class="card">
    <div class="card-body">
      <div class="signup m-5">
        <form @submit="onSubmit">
          <h1 class="card-title">
            Create New Admin
          </h1>
          <br>
          <div class="form-input">
            <label class="label">First Name</label>
            <input
              v-model="firstName"
              type="text"
              class="form-control form-control-lg"
              name="first"
              :placeholder="'Johnny'"
              required
            >
          </div>
          <br>
          <div class="form-input">
            <label class="label">Last Name</label>
            <input
              v-model="lastName"
              type="text"
              class="form-control form-control-lg"
              name="last"
              :placeholder="'Appleseed'"
              required
            >
          </div>
          <br>
          <div class="form-input">
            <label class="label">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control form-control-lg"
              name="email"
              :placeholder="'jappseed@gmail.com'"
              required
            >
          </div>
          <br>
          <div class="form-input">
            <label class="label"> Confirm Email</label>
            <input
              v-model="confirmemail"
              type="email"
              class="form-control form-control-lg"
              name="confirm-email"
              :placeholder="'Retype Email'"
              required
            >
          </div>
          <br>
          <div class="form-input">
            <label class="label">Username</label>
            <input
              v-model="userName"
              type="text"
              class="form-control form-control-lg"
              name="username"
              :placeholder="'jonapple123'"
              required
            >
          </div>
          <br>
          <div class="form-input">
            <label class="label">Password</label>
            <input
              v-model="password"
              v-on:input="isPasswordStrong"
              type="password"
              class="form-control form-control-lg"
              name="password"
              :placeholder="'Enter your password'"
              required
            >
            <client-only>
              <Password v-model="password" :strength-meter-only="true" />
            </client-only>
          </div>
          <br>
          <div class="form-input">
            <label class="label">Confirm Password</label>
            <input
              v-model="confirm"
              type="password"
              class="form-control form-control-lg"
              name="confirm"
              :placeholder="'Retype your Password'"
              required
            >
          </div>
          <br>
          <div class="question">
            <label for="security-question">Select Your Security Question</label>
            <select v-model="question" name="question" class="form-control" required>
              <option value=null>Choose question...</option>
              <option value="0">What was your first car?</option>
              <option value="1">What was the name of your first pet?</option>
              <option value="2">What high school did you attend?</option>
              <option value="3">What is your dream job?</option>
              <option value="4">What is the name of your favorite sports team?</option>
            </select>
          </div>
          <br>
          <div class="answer">
            <label for="answer">Security Question Answer</label>
            <input v-model="answer" type="text" class="form-control" placeholder="Type your answer..." required>
          </div>
          <br>
          <Notification class="error" v-if="email!=confirmemail" :message="email_error" />
          <Notification class="error" v-if="password!=confirm" :message="error_password" />
          <Notification class="error" v-if="strong!=true && password!=''" :message="error_strong" />
          <br>
          <div class="control">
            <button :disabled="strong!=true" type="submit" class="btn btn-primary btn-lg btn-square">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      confirm: '',
      question: null,
      answer: '',
      error_password: 'Passwords do not match',
      email_error: 'Emails do not match',
      error_strong: 'Password is too weak',
      state: null,
      accountType: null,
      confirmemail: '',
      isAdmin: true,
      strong: null
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit (event) {
      event.preventDefault()
      const data = {
        userName: this.userName,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        question: this.question,
        answer: this.answer,
        isAdmin: this.isAdmin
      }
      const result = await this.$http.$post('/api/users', data)
      this.state = !!result
      if (this.state) {
        this.$nextTick(() => {
          this.$router.push('/admin/manage')
        })
      }
    },
    isPasswordStrong () {
      if (zxcvbn(this.password).score > 2) {
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
