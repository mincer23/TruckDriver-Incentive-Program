<template>
  <div>
    <Header page-title="Cart" :header-image="getHeaderImage" />
    <b-container>
      <b-row class="pb-3">
        <b-col>
          <b-card>
            <b-container>
              <b-row>
                <b-col cols="6">
                  Item
                </b-col>
                <b-col>
                  Price
                </b-col>
                <b-col />
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-for="item in getCart" :key="item.id" align-v="center">
        <b-col>
          <b-card>
            <b-container>
              <b-row align-v="center">
                <b-col cols="2">
                  <b-img-lazy :src="item.image" />
                </b-col>
                <b-col cols="4">
                  {{ item.name }}
                </b-col>
                <b-col>
                  <b>{{ item.price }}</b>
                </b-col>
                <b-col>
                  <b-button block @click="removeFromCart(item.id)">Remove from Cart</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-if="getCart.length === 0">
        <b-col>
          <h5>Cart is empty.</h5>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col>
          <b-button block variant="primary" @click="placeOrder(getCart)">Place order</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage', 'getCart', 'cartContainsItem', 'getCartOrgId'])
  },
  methods: {
    ...mapMutations(['addToCart', 'removeFromCart', 'emptyCart']),
    async placeOrder (cart) {
      const data = {
        items: cart,
        orgId: this.getCartOrgId
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await this.$http.$post('/api/users/' + this.getUser.id + '/order', data)
        this.emptyCart()
        this.$router.push('/users/' + this.getUser.id + '/orders')
      } catch {
        console.log('error')
      }
    }
  }
}
</script>

<style>

</style>
