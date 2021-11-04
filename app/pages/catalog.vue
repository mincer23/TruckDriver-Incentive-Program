<template>
    <section class = "section">
     <h1 class="card-title">Catalog</h1>
    <b-container v-if="data">
        <b-row>
        <b-col v-for="item in data.results" :key="item.listing_id" cols="12">
            <b-card img-right>
            <b-card-title>
                {{ data.title }}
            </b-card-title>
            <b-card-body>
                <b-img-lazy height="135px" width="170px" :src="item.imageSrc" />
                {{ data.description }}
                <h1>
                ${{ data.price }}
                </h1>
            </b-card-body>
            <b-card-title>
                {{ data.availability }}
            </b-card-title>
            </b-card>
        </b-col>
        </b-row>
    </b-container>
    <div class = "container">
        <button v-on:click="addCart(item)" class="btn btn-primary btn-lg btn-square">Add to Cart</button>
    </div>
    </section>
</template>

<script>
export default {
  data () {
    return {
      data: null,
      testimage: null,
      title: null
    }
  },
  mehtods: {
    addCart (item) {
      this.$emit('update-cart', item)
    }
  },
  async fetch () {
    this.data = await this.router.get('/')
  }
}
</script>

<style>

</style>
