<template>
  <div>
    <Header page-title="My Orders" :header-image="getHeaderImage" />
    <b-container>
      <b-row>
        <b-col>
          <b-card>
            <b-container>
              <b-row>
                <b-col>
                  Item Name
                </b-col>
                <b-col>
                  Price
                </b-col>
                <b-col>
                  Placed
                </b-col>
                <b-col>
                  Sponsor
                </b-col>
                <b-col>
                  Status
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-for="order in orders" :key="order.id">
        <b-col>
          <b-card>
            <b-container>
              <b-row v-for="item in order.items" :key="item.id" class="py-1">
                <b-col>
                  {{ item.name }}
                </b-col>
                <b-col>
                  {{ item.price }}
                </b-col>
                <b-col>
                  {{ new Date(order.placed).toLocaleString() }}
                </b-col>
                <b-col>
                  {{ order.catalog.organization.name }}
                </b-col>
                <b-col>
                  {{ order.status }}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button variant="secondary" :to="'/users/' + getUser.id + '/orders/' + order.id">
                    Manage Order
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-if="orders.length === 0">
        <b-col>
          <b>You have no orders.</b>
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
      orders: []
    }
  },
  async fetch () {
    this.orders = await this.$http.$get('/api/users/' + this.getUser.id + '/orders')
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  }
}
</script>

<style>

</style>
