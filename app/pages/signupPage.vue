<template>
  <div class="card">
    <div class="card-body">
      <div class="signup m-5">
        <form @submit="onSubmit">
          <h1 class="card-title">
            Sign Up!
          </h1>
          <br>
          <div class="form-input">
            <label class="label">Account Level</label>
            <select id="accountType" v-model="accountType" class="form-control">
              <option value="null">
                Choose account type...
              </option>
              <option value="0">
                Driver Account
              </option>
              <option value="1">
                Sponsor Account
              </option>
            </select>
          </div>
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
          <Notification v-if="email!=confirmemail" :message="email_error" />
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
          <div>
            <b-form-checkbox
              v-model="terms"
              value="accepted"
              unchecked-value="not_accepted"
              required
            >
              I accept the <a href="termsofservice.html">Terms of Service</a> and <a href="privacypolicy.html">Privacy Policy</a>
            </b-form-checkbox>
          </div>
          <br>
          <Notification v-if="password!=confirm" :message="error" />
          <div class="login-link text-left">
            <NuxtLink to="/login">
              Already have an account?
            </NuxtLink>
          </div>
          <div class="forgot-password text-left">
            <NuxtLink to="/forgot-password">
              Forgot password?
            </NuxtLink>
          </div>
          <br>
          <div class="control">
            <button :disabled="terms==='not_accepted'" type="submit" class="btn btn-primary btn-lg btn-square">
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

export default {
  components: {
    Notification,
    Password
  },
  layout: 'signedout',
  data () {
    return {
      account: '',
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      confirm: '',
      error: 'Check Passwords!',
      email_error: 'Emails do not match',
      state: null,
      terms: 'not_accepted',
      accountType: null,
      confirmemail: ''

    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit (event) {
      event.preventDefault()
      console.log(this.terms)
      const data = {
        userName: this.userName,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      }
      const result = await this.$http.$post('/api/users', data)
      this.state = !!result
      if (result) {
        console.log(result)
        this.setUser(result)
        this.$nextTick(() => {
          this.$router.push('/')
        })
      }
    }
  }

}

</script>
