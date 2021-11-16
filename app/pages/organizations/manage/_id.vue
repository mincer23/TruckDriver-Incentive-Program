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
        <b-col cols="12">
          <b-card title="Manage Staff">
            <b-container>
              <b-row v-for="staff in orgData.staff" :key="staff.id" class="py-1">
                <b-col cols="8">
                  {{ staff.firstName + ' ' + staff.lastName }}
                </b-col>
                <b-col cols="4">
                  <b-button variant="danger" block @click="removeStaff(staff.id, firstName + ' ' + lastName)">
                    Kick
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
        <b-col cols="12">
          <b-card title="Upload Header Image">
            <b-form @submit="uploadHeaderImage">
              <b-form-file
                v-model="headerImage"
                name="headerImage"
                placeholder="Select header image file (.JPG, .PNG, .GIF, .SVG)"
                drop-placeholder="Drop file here!"
                accept="image/*"
              />
              <b-button type="submit" variant="primary">
                Upload
              </b-button>
            </b-form>
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
  data () {
    return {
      headerImage: null
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  },
  methods: {
    async removeDriver (id, fullName) {
      const result = await this.$http.$delete('/organization/' + this.orgId + '/driver/' + id)
      if (result) {
        alert('Successfully removed driver: ' + fullName)
      }
    },
    async removeStaff (id, fullName) {
      const result = await this.$http.$delete('/organization/' + this.orgId + '/staff/' + id)
      if (result) {
        alert('Successfully removed staff: ' + fullName)
      }
    },
    async uploadHeaderImage (event) {
      event.preventDefault()
      const formdata = new FormData(event.target)
      const result = await this.$http.$put('/api/organizations/' + this.orgId, formdata)
      if (result) {
        alert('Successfully uploaded new header image!')
      }
    }
  }
}
</script>

<style>

</style>
