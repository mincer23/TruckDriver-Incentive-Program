<template>
  <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <h2 class="title has-text-centered">Request Sponsor</h2>
              <div class="field">
                  <label class="label">Enter Sponsor</label>
                      <div class="control">
                          <input
                              type="text"
                              class="input"
                              name="sponsor"
                              v-model="sponsor"
                              required
                          />
                      </div>
                       <div class="control">
                        <button type="submit" class="button is-dark is-fullwidth">Request for Sponsor</button>
                    </div>
                </div>
          </div>
        </div>
      </div>
  </section>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      sponsor: ''
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit (event) {
      event.preventDefault()
      const data = {
        sponsor: this.sponsor
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
