<template>
  <div>
    <Header :page-title="'Manage ' + orgName + '\'s Catalog'" :header-image="getHeaderImage" />
    <b-container>
      <b-row>
        <b-col class="d-flex justify-content-center w-100 h-100 pb-3">
          <b-button variant="primary" :to="'/catalogs/manage/add/' + $route.params.catalogId">Add new items from Etsy</b-button>
          <b-spinner v-if="items.length === 0" />
        </b-col>
      </b-row>
      <b-row v-for="item in items" :key="item.id">
        <b-col cols="12">
          <b-card>
            <b-container>
              <b-row align-v="center">
                <b-col cols="3">
                  <b-img :src="item.image">Image</b-img>
                </b-col>
                <b-col cols="6">
                  <b-row>
                    <b-col>
                      <h4>{{ item.name }}</h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      {{ item.description }}
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="3">
                  <b-row align-v="center">
                    <b-col>
                      <h4>{{ item.price }} pts</h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-button variant="danger" @click="removeItem(item)" block>Remove from Catalog</b-button>
                    </b-col>
                  </b-row>
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
  data () {
    return {
      items: [],
      orgName: ''
    }
  },
  async fetch () {
    const catalog = await this.$http.$get('/api/catalogs/' + this.$route.params.catalogId + '/items')
    this.orgName = catalog.organization.name
    this.items = catalog.items
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  },
  methods: {
    async removeItem (item) {
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await this.$http.$delete('/api/catalogs/item/' + item.id)
        this.$fetch()
      } catch {
        console.log('error')
      }
    }
  }
}
</script>

<style>

</style>
