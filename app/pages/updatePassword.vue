<template>
  <div>
    <Header page-title="Change Password" />
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-center">Change Password</h2>
        <form method="post" @submit="updateUser">
          <div class="oldPassword">
            <label>Old Password</label>
            <input
              v-model="oldpassword"
              type="password"
              name="oldpassword"
              class="form-control"
            >
          </div>
          <br>
          <div class="newpassword">
            <label class="label">New Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              name="password"
              required
            >
            <client-only>
              <Password v-model="password" :strength-meter-only="true" />
            </client-only>
          </div>
          <br>
          <div class="confirmpassword">
            <label class="label">Confirm Password</label>
            <input
              v-model="confirm"
              type="password"
              class="form-control"
              name="Confirm Password"
              required
            >
          </div>
          <Notification v-if="password!=confirm" :message="error" />
          <br>
          <div class="control">
            <b-button type="submit" class="button is-fullwidth">Update Password</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
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
      oldpassword: '',
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
          password: this.password,
          oldpassword: this.oldpassword
        })
        this.status = true
      } catch (e) {
        this.status = false
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
</style>
