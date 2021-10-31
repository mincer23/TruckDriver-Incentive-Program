<template>
  <div class="vw-100 vh-100 d-flex justify-content-center align-items-center">
    Error :(
    <br />
    {{ error }}
  </div>
</template>

<style>

</style>
<script>
export default {
  props: ['error'],
  layout: 'signedout'
}
</script>
