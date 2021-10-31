<template>
 <!-- Admin only view -->
  <section class="section">
    <div class="container">
      <h2 class="title">New Users</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ getUser.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ getUser.email }}
        </p>
      </div>

    <form @submit="onAccept">
        <div class = "container">

            <div class="control">
            <button type="submit" class="button is-dark is-fullwidth">Accept Account</button>
            </div>

        </div>
    </form>

    <form @submit="onDeny">
        <div class = "container">

            <div class="control">
            <button type="submit" class="button is-dark is-fullwidth">Decline Account</button>
            </div>

        </div>
    </form>

    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {

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
