<template>
  <div class="card">
    <div class="card-body">
      <div class="signup m-5">
          <form @submit="onSubmit">
              <h1 class="card-title">Log In</h1>
              <br>
              <div class="form-input">
                <label class="label">Account Level</label>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  name="account"
                  v-model="account"
                  :placeholder="'Enter a, s, or d followed by user code'"
                  required
                />
             </div>
             <br>
            <div class="form-input">
              <label class="label">First Name</label>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  name="first"
                  v-model="first"
                  :placeholder="'Johnny'"
                  required
                />
            </div>
            <br>
            <div class="form-input">
              <label class="label">Last Name</label>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  name="last"
                  v-model="last"
                  :placeholder="'Appleseed'"
                  required
                />
            </div>
            <br>
            <div class="form-input">
              <label class="label">Email</label>
                <input
                  type="email"
                  class="form-control form-control-lg"
                  name="email"
                  v-model="email"
                  :placeholder="'jappseed@gmail.com'"
                  required
                />
            </div>
            <br>
            <div class="form-input">
              <label class="label">Username</label>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  name="username"
                  v-model="username"
                  :placeholder="'jonapple123'"
                  required
                />
            </div>
            <br>
            <div class="form-input">
              <label class="label">Password</label>
                <input
                  type="password"
                  class="form-control form-control-lg"
                  name="password"
                  v-model="password"
                  :placeholder="'Enter your password'"
                  required
                />
                <client-only>
                  <Password v-model="password" :strengthMeterOnly="true" />
                </client-only>
            </div>
            <br>
             <div class="form-input">
              <label class="label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control form-control-lg"
                  name="confirm"
                  v-model="confirm"
                  :placeholder="'Retype your Password'"
                  required
                />
            </div>
            <br>
            <Notification :message="error" v-if="password!=confirm"/>
            <div class="control">
              <button type="submit" class="btn btn-primary btn-lg btn-square">Register</button>
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
  layout: "signedout",
  
  components: {
    Notification,
    Password
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
