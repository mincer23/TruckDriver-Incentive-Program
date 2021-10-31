<template>
  <div class="card text-center w-75">
    <div class="card-body">
      <div class="login m-5">
        <form @submit="onSubmit">
            <h1 class="card-title">Log In</h1>
            <br>
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
            <button type="submit" class="btn btn-primary btn-lg btn-square">Sign In</button>
            <div class="forgot-password text-right">
              <NuxtLink to="/forgot-password">
                Forgot password?
              </NuxtLink>
            </div>
            <br>
            <div class="create-account text-right">
              <NuxtLink to="/signupPage">
                New? Create an account!
              </NuxtLink>
            </div>
          </form>
        </div>
        <div class="form-input">
          <label>Password</label>
          <input v-model="password" name="password" type="password" class="form-control form-control-lg">
        </div>
        <br>
        <button type="submit" class="btn btn-primary btn-lg btn-square">Sign In</button>
        <p class="create-account text-right mt-2 mb-4">
          <NuxtLink to="/signupPage">
            New? Create an account!
          </NuxtLink>
        </p>
        <p class="forgot-password text-right mt-2 mb-4">
          <NuxtLink to="/forgot-password">
            Forgot password?
          </NuxtLink>
        </p>
  </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      userName: null,
      password: null,
      state: null
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit (event) {
      event.preventDefault()
      const data = {
        username: this.userName,
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

<style scoped>
.card {
  margin: auto;
}
</style>
