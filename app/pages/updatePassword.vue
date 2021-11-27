<template>
  <div>
    <Header page-title="Change Password" />
    <Notification v-if="status" class="success" message="Updated password successfully." />
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
              required
            >
          </div>
          <br>
          <div class="newpassword">
            <label class="label">New Password</label>
            <input
              v-model="password"
              v-on:input="isPasswordStrong"
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
          <Notification class="error" v-if="password!=confirm" :message="error" />
          <Notification class="error" v-if="strong!=true && password!=''" :message="error_strong" />
          <br>
          <div class="control">
            <b-button :disabled="password!=confirm || strong!=true" type="submit" class="button is-fullwidth">Update Password</b-button>
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
import zxcvbn from '~/node_modules/zxcvbn'
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
      error: 'Passwords do not match',
      error_strong: 'New password is too weak',
      strong: false,
      status: null
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    isPasswordStrong () {
      if (zxcvbn(this.password).score > 2) {
        this.strong = true
      } else {
        this.strong = false
      }
    },
    async updateUser (event) {
      event.preventDefault()
      try {
        // eslint-disable-next-line no-unused-vars
        const update = await this.$http.$put('/api/users/' + this.getUser.id, {
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
.success {
  margin: 10px 0px;
  padding: 20px;
  color: #4F8A10;
  background-color: #DFF3BF;
  border: 1px solid;
  box-shadow: 1px 1px 3px #888;
  border-radius: .5em;
  text-align: center;
}
</style>
