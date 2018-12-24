<template>
  <div id="app">
    <homescreen></homescreen>
  </div>
</template>

<script>
import Homescreen from './components/Homescreen.vue'
export default {
  name: 'app',
  components: {
    Homescreen
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
#app {
  background-color: #000;
  height: 100%;
}
</style>
