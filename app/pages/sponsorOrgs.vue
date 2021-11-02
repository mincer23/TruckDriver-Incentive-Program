<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Sponsor Organizations</h2>
            <div class = "content">
              <p>
                <strong>Sponsor:</strong>
                {{ user.sponsor }}
              </p>
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
      sponsor: '',
      state: null
    }
  },
  methods: {
    ...mapMutations(['setUser'])
  }

}
</script>
