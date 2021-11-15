<template>
    <section class = "section">
     <h1 class="card-title">Catalog</h1>
    <b-container v-if="data">
      <div class = "search-bar">
        <b-form-input
          @input = "search_text()"
          v-model="search.text"
          type = "text"
          placeholder="Search for Item"
        ></b-form-input>

        <b-dropdown text="Sort by">
          <b-dropdown-item href="#">Ascending</b-dropdown-item>
          <b-dropdown-item href="#">Descending</b-dropdown-item>
        </b-dropdown>
      </div>
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
      item.preventDefault()
      const data = {
        item: this.item
      }
      console.log(data)
      this.$emit('update-cart', item)
    },
    async fetch () {
      this.data = await fetch('https://openapi.etsy.com/v2/listings/active?api_key=vh0cf53nxhvc871sc5b2eabr').then(res => res.json())
      for (let i = 0; i < this.data.results.length && i < 8; i++) {
        this.data.results[i].imageSrc = await fetch('https://openapi.etsy.com/v2/listings/' + this.data.results[i].listing_id + '/images?api_key=vh0cf53nxhvc871sc5b2eabr').then(res => res.json()).then(result => result?.results[0]?.url_170x135)
      }
    },
    sortAsc (data) {
      // return _.orderBy(data, ' title', 'asc')
    },
    sortDesc (data) {
      // return _.orderBy(data, ' title', 'desc')
    }

  }
}
</script>

<style>

</style>
