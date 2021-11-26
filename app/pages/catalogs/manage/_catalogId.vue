<template>
  <div>
    <Header page-title="Manage Catalog" :header-image="getHeaderImage" />
    <b-container>
      <b-row v-for="item in items" :key="item.id">
        <b-col cols="12">
          <b-card>
            <b-container>
              <b-row align-v="center">
                <b-col cols="3">
                  <b-img src="https://placekitten.com/135/135">Image</b-img>
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
                      <b-button variant="success">Add to catalog</b-button>
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
  async asyncData ({ store, $http }) {
    const items = await $http.$get('https://openapi.etsy.com/v2/listings/active?api_key=vh0cf53nxhvc871sc5b2eabr')
    return { items: items.results }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  }
}
</script>

<style>

</style>
