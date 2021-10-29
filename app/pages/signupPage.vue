<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Sign Up!</h2>
          <form @submit="onSubmit">
            <div class="field">
              <label class="label">Account Level</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="account"
                  v-model="account"
                  :placeholder="'Enter a, s, or d followed by user code'"
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
                  name="first"
                  v-model="first"
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
                  name="last"
                  v-model="last"
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
                  name="confirm"
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
import { mapMutations } from 'vuex'
import Notification from '~/components/Notification'
export default {
  components: {
    Notification
  },
  data () {
    return {
      account: '',
      first: '',
      last: '',
      email: '',
      username: '',
      password: '',
      confirm: '',
      error: 'Check Passwords!',
      state: null
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit (event) {
      event.preventDefault()
      const data = {
        username: this.username,
        password: this.password
      }
      const result = await this.$http.$post('/api/login', data)
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
