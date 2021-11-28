<template>
  <form method="post" @submit="onSubmit">
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input
          type="text"
          class="input"
          name="First Name"
          v-model="firstName"
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
        />
      </div>
    </div>
      <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          type="password"
          class="input"
          name="password"
          v-model="confirm"
        />
      </div>
    </div>
    <div class="control">
      <button type="submit" class="button is-dark is-fullwidth">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      firstName: null,
      lastName: null,
      confirm: null,
      email: null
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.confirm
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await this.$http.$put('/api/users/' + this.userId, data)
        this.$emit('update')
      } catch {
        this.state = false
      }
    }
  }
}
</script>

<style>

</style>
