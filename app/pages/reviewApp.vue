<template>
 <!-- Admin only view -->
  <section class="section">
    <div class="container">
      <h2 class="title">New Users</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ userData.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ userData.email }}
        </p>
      </div>

    <form @submit="onAccept">
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Accept User </button>
            </div>
    </form>

    <form @submit="onDeny">
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Deny User</button>
            </div>
    </form>

    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      data: '',
      username: '',
      email: '',
      state: ''
    }
  },

  methods: {
    ...mapMutations(['setUser']),
    async onDeny (event) {
      event.preventDefault()
      const data = {
        username: this.username,
        status: false
      }
      try {
        const result = await this.$http.$post('/api/updatestatus', data)
        this.setUser(result)
        this.$nextTick(() => {
          this.$router.push('/')
        })
      } catch {
        this.state = false
      }
    },
    async onAccept (event) {
      event.preventDefault()
      const data = {
        username: this.username,
        status: true
      }
      try {
        const result = await this.$http.$post('/api/updatestatus', data)
        this.setUser(result)
        this.$nextTick(() => {
          this.$router.push('/')
        })
      } catch {
        this.state = false
      }
    }
  },

  async fetch () {
    this.data = await this.$http.$get('/profile/:id')
  }

}
</script>
