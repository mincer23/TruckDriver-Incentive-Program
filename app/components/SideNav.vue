<template>
  <b-container class="p-0 m-0" fluid>
    <b-row class="my-5 mx-3 absolutely-no-gutters" no-gutters>
      <b-col cols="12" class="ml-4 pb-5">
        <h4>Menu</h4>
      </b-col>
      <NuxtLink to="/" class="w-100 text-decoration-none text-white p-0 ml-4">
        <b-col cols="12" class="d-flex align-items-center p-0 m-0 entry">
          <span>Dashboard</span>
        </b-col>
      </NuxtLink>
      <NuxtLink to="/points" class="w-100 text-decoration-none text-white p-0 ml-4">
        <b-col cols="12" class="d-flex align-items-center p-0 m-0 entry">
          <span>Points</span>
        </b-col>
      </NuxtLink>
      <NuxtLink to="/orders" class="w-100 text-decoration-none text-white p-0 ml-4">
        <b-col cols="12" class="d-flex align-items-center p-0 m-0 entry">
          <span>Orders</span>
        </b-col>
      </NuxtLink>
      <NuxtLink to="/catalog" class="w-100 text-decoration-none text-white p-0 ml-4">
        <b-col cols="12" class="d-flex align-items-center p-0 m-0 entry">
          <span>Catalog</span>
        </b-col>
      </NuxtLink>
      <NuxtLink to="/organizations" class="w-100 text-decoration-none text-white p-0 ml-4">
        <b-col cols="12" class="d-flex align-items-center p-0 m-0 entry">
          <span>Sponsors</span>
        </b-col>
      </NuxtLink>
      <b-col cols="12" class="w-100 p-0 m-0">
        <hr class="w-100">
      </b-col>
      <NuxtLink to="/users/1" class="w-100 text-decoration-none text-white p-0 ml-4">
        <b-col cols="12" class="d-flex align-items-center p-0 m-0 entry">
          <span>Account</span>
        </b-col>
      </NuxtLink>
      <NuxtLink to="/settings" class="w-100 text-decoration-none text-white p-0 ml-4">
        <b-col cols="12" class="d-flex align-items-center p-0 m-0 entry">
          <span>Settings</span>
        </b-col>
      </NuxtLink>
    </b-row>
  </b-container>
</template>

<script>
export default {

}
</script>

<style scoped>
  .absolutely-no-gutters {
    padding: 0;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  hr {
    width: 100%;
    border-bottom: 1px solid white;
  }

  h4:before {
    content: "★";
    padding-right: 1em;
  }

  .entry {
    height: 4em;
  }

  .entry:before {
    position: absolute;
    padding-bottom: 7px;
    content: "•";
    font-size: 3em;
  }

  span {
    margin-left: 3em;
  }
</style>
