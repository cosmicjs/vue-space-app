<template lang="html">
  <div class="homescreen">
    <navbar />
    <div class="jumbotron" v-html="homepageContent"></div>
    <div class="cosmic-object-select">
      <div class="cosmic-object" v-on:click="setSelectedAsset(index)" v-for="(obj, index) in cosmicAssetObjs" :key="index">
         <cosmic-asset :cosmicObj="obj" :assetKey="index" class="cosmic-asset" />
      </div>
    </div>
  </div>

</template>

<script>
import Navbar from './Navbar.vue'
import CosmicAsset from './CosmicAsset.vue'

export default {
  components: {
    Navbar,
    CosmicAsset
  },
  data() {
    return {
      // homepage data from Cosmic API
      homepageData: '',
      homepageContent: '',
      cosmicAssetObjs: [],
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
      console.log(data)
      // Loop through returned bucket data
      // get the appropriate object, and assign to the right value
      let homepageObj
      data.bucket.objects.map((object) => {
        if (object.title === 'Homepage') {
          homepageObj = object
        } else {
          this.cosmicAssetObjs.push(object)
        }
      })
      if (homepageObj) this.assembleHomepageData(homepageObj)
    }).catch(err => {
      console.log('Error getting bucket data:', err)
    })
    },
  methods: {
    assembleHomepageData (homepageObjFromAPI) {
      this.homepageData = homepageObjFromAPI
      this.homepageContent = homepageObjFromAPI.content
    },
    setSelectedAsset (index) {
      this.$store.commit('setSelectedCosmicIndex', index)
    }
  },
  computed: {}
}
</script>

<style lang="css">
  .homescreen {
    height: 100vh;
  }

  .text {
    color: white;
  }

  .cosmic-object-select {
    width: 80%;
    margin: 0 auto;
  }

  .cosmic-asset {
    cursor: pointer;
  }
</style>
