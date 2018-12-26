<template lang="html">
  <div class="homescreen">
    <navbar></navbar>
    <div class="jumbotron" v-html="homepageContent"></div>
    <div class="cosmic-object-select">

    </div>
  </div>

</template>

<script>
import Navbar from './Navbar.vue'
import CosmicAsset from './CosmicAsset.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      // homepage data from Cosmic API
      homepageData: '',
      homepageContent: ''
    }
  },
  mounted() {
    let t = this.$store.state.token
    let self = this
    const Cosmic = require('cosmicjs')({
      token: t // required
    })
    const bucket = Cosmic.bucket({
    slug: 'cosmic-space',
    read_key: '',
    write_key: ''
    })
    bucket.getBucket().then(data => {
      console.log(data.bucket.objects)
      // Loop through returned bucket data
      // get the appropriate object, and assign to the right value
      let homepageObj
      data.bucket.objects.map((object) => {
        if (object.slug = 'homepage') {
          homepageObj = object
        }
      })
      if (homepageObj) this.assembleHomepageData(homepageObj)
    }).catch(err => {
      console.log('Error getting bucket data:', err)
    })
    },
  methods: {
    assembleHomepageData(homepageObjFromAPI) {
      this.homepageData = homepageObjFromAPI
      this.homepageContent = homepageObjFromAPI.content
    }
  }
}
</script>

<style lang="css">
.homescreen {
  color: red;
  height: 100vh;
}
</style>
