<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Change Password</h2>
          <form method="post" @submit.prevent="change">
            <div class="field">
              <label class="label">New Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                  required
                />
                <client-only>
                  <Password v-model="password" :strengthMeterOnly="true"/>
                </client-only>
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
              <button type="submit" class="button is-dark is-fullwidth">Update Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Password from '~/node_modules/vue-password-strength-meter'
import Notification from '~/components/Notification'

export default {
  components: {
    Notification,
    Password
  },
  data () {
    return {
      password: '',
      confirm: '',
      error: 'Check Passwords!'
    }
  },
  methods: {
    async register () {
      try {
        await this.$http.post('/api/user', {
          username: this.username,
          email: this.email,
          password: this.password
        })

        await this.$http.post('/api/login', {
          data: {
            username: this.username,
            password: this.password
          }
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}

</script>
