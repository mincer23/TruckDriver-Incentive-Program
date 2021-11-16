<template>
    <div class="card">
        <div class="card-body">
            <div class="cart m-5">
                <form @submit = "onSubmit">
                    <h1 class="card-title">Cart</h1>
                        <br>
                        <b-container v-if="data">
                            <b-col v-for="item in data.results" :key="item.listing_id">
                                <b-card>
                                    <b-card-title>
                                        {{ data.title }}  {{ data.price }} {{ data.availability }}
                                    </b-card-title>
                                </b-card>
                                <b-card>
                                    <div class="control">
                                        <input type="text" v-model = "title">
                                        <button type="submit" class="btn btn-primary btn-lg btn-square">Delete</button>
                                    </div>
                                </b-card>

                            </b-col>
                        </b-container>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data: '',
            state: ''
        }
    }, 
    async fetch () {
        this.data = await this.router.get('/')
    }
}
</script>