<template>
    <section class = "section">
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
        <input type="text" v-model = "title">
        <button type="submit" class="button is-dark is-fullwidth">Add to Cart</button>
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
  async fetch () {
    this.data = await this.router.get('/')
  }
}
</script>

<style>

</style>
