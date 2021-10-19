<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Sign Up!</h2>


          <form method="post" @submit.prevent="register">


            <div class="field">
              <label class="label">Account Level</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="Account Level"
                  v-model="account"
                  required
                />
             </div>
            </div>
        
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="First Name"
                  v-model="name1"
                  required
                />
             </div>
            </div>

            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="Last Name"
                  v-model="name2"
                  required
                />
             </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
                />
             </div>
            </div>
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="username"
                  v-model="username"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                  required
                />
              </div>
            </div>
             <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="Confirm Password"
                  v-model="confirm"
                  required
                />
              </div>
            </div>


            <Notification :message="error" v-if="password!=confirm"/>


            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Register</button>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  components: {
    Notification,
  },

  data() {
    return {
      account: '',
      name1: '',
      name2: '',
      email: '',
      username: '',
      password: '',
      confirm: '',
      error: 'Check Passwords!'
    }
  },


   methods: {
    async register() {
      try {
        await this.$axios.post('register', {
          username: this.username,
          email: this.email,
          password: this.password
        })

        await this.$auth.loginWith('local', {
          data: {
          email: this.email,
          password: this.password
          },
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }

}

</script>