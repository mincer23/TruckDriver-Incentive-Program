<template>
  <div>
    <Header page-title="Manage Users" />
    <b-container>
      <b-row v-for="user in users" :key="user.id">
        <b-col>
          <b-card>
            <b-container>
              <b-row align-h="center" align-v="center">
                <b-col cols="6">
                  <NuxtLink :to="'/users/' + user.id" class="text-decoration-none">
                    <h5>{{ user.firstName + " '" + user.userName + "' " + user.lastName }}</h5>
                  </NuxtLink>
                </b-col>
                <b-col>
                  <b-button variant="primary">Edit User Info</b-button>
                </b-col>
                <b-col>
                  <b-button variant="info">Adjust Points</b-button>
                </b-col>
                <b-col>
                  <b-button variant="danger">Delete User</b-button>
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
      users: []
    }
  },
  async fetch () {
    this.users = await this.$http.$get('/api/users')
  }
}
</script>

<style>

</style>
