<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Edit Information</h2>

          <Notification :message="error" v-if="error"/>

          <form method="post" @submit.prevent="register">
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="First Name"
                  v-model="name1"
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
                  v-model="name2"
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
              <label class="label">Username</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="username"
                  v-model="username"
                  required
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
                  v-model="password"
                  required
                />
              </div>
              <client-only>
                  <Password v-model="password" :strengthMeterOnly="true"/>
              </client-only>
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
        </div>
      </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'
import Password from '~/node_modules/vue-password-strength-meter'
export default {
  components: {
    Notification,
    Password
  },
  data () {
    return {
      name1: '',
      name2: '',
      email: '',
      username: '',
      password: '',
      confirm: '',
      error: null
    }
  }
}

</script>
