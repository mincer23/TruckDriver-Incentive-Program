import 'bootstrap/dist/css/bootstrap.min.css'

<template>
  <div class="login">
    <form>
      <h1>Log In</h1>
      <p />
      <div class="form-input">
        <label>Email Address</label>
        <input type="email" class="form-control form-control-lg">
      </div>
      <div class="form-input">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg">
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

</script> 