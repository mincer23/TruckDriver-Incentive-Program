<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Change Password</h2>
          <form method="post" @submit="updateUser">
            <div class="field">
              <label class="label">New Password</label>
              <div class="control">
                <input
                  v-model="password"
                  type="password"
                  class="input"
                  name="password"
                  required
                >
                <client-only>
                  <Password v-model="password" :strength-meter-only="true" />
                </client-only>
              </div>
            </div>
            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input
                  v-model="confirm"
                  type="password"
                  class="input"
                  name="Confirm Password"
                  required
                >
              </div>
            </div>
            <Notification v-if="password!=confirm" :message="error" />
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
import { mapGetters } from 'vuex'
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
      error: 'Check Passwords!',
      status: null
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    async updateUser (event) {
      event.preventDefault()
      try {
        // eslint-disable-next-line no-unused-vars
        const update = await this.$http.put('/api/users/' + this.getUser.id, {
          password: this.password
        })
        this.status = true
      } catch (e) {
        this.status = false
      }
    }
  }
}

</script>
