<template lang="html">
  <div class="homescreen">
    <navbar></navbar>
  </div>

</template>

<script>
import Navbar from './Navbar.vue'
import {token} from '../authenticate.js'
export default {
  components: {
    Navbar
  },
  mounted() {
    console.log(this.$store.state.count)
  },
  methods: {
  }
}
</script>

<style lang="css">
.homescreen {
  color: red;
  height: 100vh;
}
</style>
