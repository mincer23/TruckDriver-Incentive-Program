<template>
  <div class="card">
    <div class="card-body">
      <div class="login m-5">
        <form @submit="onSubmit">
          <h3 class="card-subtitle mb-2 text-muted" style="text-align:center">Driver Incentive Program</h3>
          <br><br>
          <h1 class="card-title" style="text-align: center">Log In</h1>
          <h6 class="card-subtitle mb-2 text-muted" style="text-align: center">Enter your username and password</h6>
          <br>
          <Notification  v-if="error" :message="error" />
          <div class="form-input">
            <label>Username</label>
            <input v-model="userName" name="username" type="text" class="form-control form-control-lg">
          </div>
          <br>
          <div class="form-input">
            <label>Password</label>
            <input v-model="password" name="password" type="password" class="form-control form-control-lg">
          </div>
          <br>
          <button type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
          <br><br>
          <div class="forgot-password text-center">
            <NuxtLink to="/forgot-password">
              Forgot password?
            </NuxtLink>
          </div>
          <div class="create-account text-center">
            <NuxtLink to="/signupPage">
              New? Create an account!
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Notification from '~/components/Notification'
export default {
  layout: 'signedout',
  data () {
    return {
      userName: null,
      password: null,
      state: null,
      error: null
    }
  },
  componets: {
    Notification
  },

  methods: {
    ...mapMutations(['setUser']),
    async onSubmit (event) {
      event.preventDefault()
      const data = {
        username: this.userName,
        password: this.password
      }
      try {
        const result = await this.$http.$post('/api/login', data)
        this.setUser(result)
        this.$nextTick(() => {
          this.$router.push('/')
        })
      } catch {
        this.state = false
        this.error = 'Invalid Username or Password, please try again'
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
.notification {
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
