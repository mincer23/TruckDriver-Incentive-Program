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
                              name="Sponsor"
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
export default {
}
</script>
