import 'bootstrap/dist/css/bootstrap.min.css'

<template>
  <div class="login">
    <form method="post">
      <h1>Log In</h1>
      <p />
      <div class="form-input">
        <label>Username</label>
        <input type="text" class="form-control form-control-lg" required />
      </div>
      <div class="form-input">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" required />
      </div>
      <p />
      <button type="submit" class="btn btn-primary btn-lg btn-square">Sign In</button>
      <p class="forgot-password text-right mt-2 mb-4">
        <NuxtLink to="/forgot-password">Forgot password?</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script>

export default ({
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login () {
      await $http.post('/login', {
        data: {
          username: this.username,
          password: this.password
        }
      })
    }
  }
})
</script>
