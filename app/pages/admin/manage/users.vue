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
                  <b-button v-b-toggle="'info-' + user.id" variant="primary">Edit User Info</b-button>
                </b-col>
                <b-col>
                  <b-button v-b-toggle="'points-' + user.id" variant="info">Adjust Points</b-button>
                </b-col>
                <b-col>
                  <b-button variant="danger">Delete User</b-button>
                </b-col>
              </b-row>
              <b-collapse :id="'info-' + user.id">
                <b-row>
                  <b-col>
                    <EditUserInfo :user-id="user.id" @update="update" />
                  </b-col>
                </b-row>
              </b-collapse>
              <b-collapse :id="'points-' + user.id">
                <b-row>
                  <b-col>
                    <AdjustPoints :user-id="user.id" />
                  </b-col>
                </b-row>
              </b-collapse>
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
  },
  methods: {
    update () {
      this.$fetch()
    }
  }
}
</script>

<style>

</style>
