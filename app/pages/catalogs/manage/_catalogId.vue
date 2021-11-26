<template>
  <div>
    <Header page-title="Manage Catalog" :header-image="getHeaderImage" />
    <b-container>
      <b-row v-for="item in items" :key="item.listing_id">
        <b-col cols="12">
          <b-card>
            <b-container>
              <b-row align-v="center">
                <b-col cols="3">
                  <b-img-lazy :src="'/api/catalogs/image/' + item.listing_id">Image</b-img-lazy>
                </b-col>
                <b-col cols="6">
                  <b-row>
                    <b-col>
                      <h4>{{ item.title }}</h4>
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
                      <h4>{{ Number(item.price) * 1000 }} pts</h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-spinner v-if="item.state === false" variant="primary" />
                      <b-button v-if="item.state === true" variant="secondary" disabled>Added to catalog</b-button>
                      <b-button v-if="item.state === 'active'" variant="success" @click="addItem(item)">Add to catalog</b-button>
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
  async asyncData ({ $http, params }) {
    const items = await $http.$get('https://openapi.etsy.com/v2/listings/active?api_key=vh0cf53nxhvc871sc5b2eabr')
    return { items: items.results, catalogId: Number(params.catalogId) }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  },
  methods: {
    async addItem (item) {
      item.state = false
      const data = {
        name: item.title,
        description: item.description,
        price: Number(Number(item.price) * 1000),
        etsyId: item.listing_id
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await this.$http.$post('/api/catalogs/' + this.catalogId + '/item', data)
        item.state = true
      } catch {
        item.state = 'active'
      }
    }
  }
}
</script>

<style>

</style>
