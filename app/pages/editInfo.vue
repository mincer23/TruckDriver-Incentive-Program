<template>
  <section class="section">
    <Header page-title="Edit Information" :header-image="getHeaderImage" />
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Edit Information</h2>

          <Notification :message="error" v-if="error"/>

          <form method="post" @submit="onSubmit">
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="First Name"
                  v-model="firstName"
                  required
                />
             </div>
            </div>

            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="Last Name"
                  v-model="lastName"
                  required
                />
             </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
                />
             </div>
            </div>
             <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="Confirm Password"
                  v-model="confirm"
                  required
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Submit</button>
            </div>
          </form>
          </div>
          <div class="updatePassword text-center">
            <NuxtLink to="/updatePassword">
              Need to change your password?
            </NuxtLink>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      confirm: '',
      error: null
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit (event) {
      event.preventDefault()
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        oldpassword: this.confirm
      }
      try {
        const result = await this.$http.$post('/api/users/' + this.getUser.id, data)
        this.setUser(result)
        this.$nextTick(() => {
          this.$router.push('/')
        })
      } catch {
        this.state = false
      }
    }
  }
}

</script>
