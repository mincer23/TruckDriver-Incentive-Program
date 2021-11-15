<template>
  <div>
    <Header :page-title="'Manage ' + orgData.name" :header-image="getHeaderImage" />
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-card title="Manage Drivers">
            <b-container>
              <b-row v-for="driver in orgData.drivers" :key="driver.id" class="py-1">
                <b-col cols="8">
                  {{ driver.firstName + ' ' + driver.lastName }}
                </b-col>
                <b-col cols="3">
                  <b-button block>
                    Adjust Points
                  </b-button>
                </b-col>
                <b-col cols="1">
                  <b-button variant="danger" block @click="removeDriver(driver.id, firstName + ' ' + lastName)">
                    Kick
                  </b-button>
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
import { mapGetters } from 'vuex'
export default {
  async asyncData ({ $http, params }) {
    const orgData = await $http.$get('/api/organizations/' + params.id)
    return { orgData, orgId: params.id }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  },
  methods: {
    async removeDriver (id, fullName) {
      const result = await this.$http.$delete('/organization/' + this.params.id + '/driver/' + id)
      if (result) {
        alert('Successfully removed user: ' + fullName)
      }
    }
  }
}
</script>

<style>

</style>
