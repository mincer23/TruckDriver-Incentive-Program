<template>
  <div>
    <Header page-title="Manage Organizations" />
    <b-container>
      <b-row v-for="org in organizations" :key="org.id">
        <b-col>
          <b-card>
            <b-container>
              <b-row align-v="center">
                <b-col>
                  <NuxtLink :to="'/organizations/' + org.id">
                    {{ org.name }}
                  </NuxtLink>
                </b-col>
                <b-col>
                  <b-button :to="'/organizations/manage/' + org.id" variant="primary" block>Manage</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      organizations: []
    }
  },
  async fetch () {
    this.organizations = await this.$http.$get('/api/organizations')
  }
}
</script>

<style>

</style>
