<template>
  <div>
    <Header :page-title="orgName + '\'s Catalog'" :header-image="getHeaderImage" />
    <b-container>
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
                    <b-col v-if="!cartContainsItem(item.id)">
                      <b-button v-if="Number(balance) >= Number(item.price)" variant="success" @click="addToCart({item, orgId})">Add to cart</b-button>
                      <b-button v-if="Number(balance) < Number(item.price)" variant="secondary" disabled>Not enough points</b-button>
                    </b-col>
                    <b-col v-else>
                      <b-button variant="success" disabled>Already in cart</b-button>
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      items: [],
      balance: null,
      orgName: '',
      orgId: null
    }
  },
  async fetch () {
    const catalog = await this.$http.$get('/api/catalogs/' + this.$route.params.catalogId + '/items')
    this.items = catalog.items
    this.orgName = catalog.organization.name
    this.orgId = catalog.organization.id
    if (this.getUser.staffFor.map(elem => elem.id).includes(catalog.orgId)) {
      this.balance = 0
    } else {
      const points = await this.$http.$get('/api/users/' + this.getUser.id + '/' + catalog.orgId + '/points')
      this.balance = points.balance
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage', 'getCart', 'cartContainsItem'])
  },
  methods: {
    ...mapMutations(['addToCart', 'removeFromCart'])
  }
}
</script>

<style>

</style>
