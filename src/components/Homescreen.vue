<template lang="html">
  <div class="homescreen">
    <navbar></navbar>
  </div>

</template>

<script>
import Navbar from './Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="css">
.homescreen {
  color: red;
  height: 100vh;
}
</style>
