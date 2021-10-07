<template>
  <b-container v-if="data">
    <b-row>
      <b-col v-for="item in data.results" :key="item.listing_id" cols="12">
        <b-card img-right>
          <b-card-title>
            {{ item.title }}
          </b-card-title>
          <b-card-body>
            <b-img-lazy height="135px" width="170px" :src="item.imageSrc" />
            {{ item.description }}
            <h1>
              ${{ item.price }}
            </h1>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      data: null,
      testimage: null
    }
  },
  async fetch () {
    this.data = await fetch('https://openapi.etsy.com/v2/listings/active?api_key=vh0cf53nxhvc871sc5b2eabr').then(res => res.json())
    for (let i = 0; i < this.data.results.length && i < 8; i++) {
      this.data.results[i].imageSrc = await fetch('https://openapi.etsy.com/v2/listings/' + this.data.results[i].listing_id + '/images?api_key=vh0cf53nxhvc871sc5b2eabr').then(res => res.json()).then(result => result?.results[0]?.url_170x135)
    }
  }
}
</script>

<style>

</style>
