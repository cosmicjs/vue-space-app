<template lang="html">
  <div class="homescreen">
    <headerArea></headerArea>
    <!-- <div class="cosmic-object-selector" v-show="selectedIndex == undefined">
      <h1> I want to learn more about.... </h1>
      <div class="cosmic-object-select row">
        <div class="cosmic-object col-md-3" v-on:click="setSelectedAsset(index)" v-for="(obj, index) in cosmicAssetObjs.slice(0,4)" :key="index">
           <cosmic-asset :cosmicObj="obj" :assetKey="index" class="cosmic-asset" />
        </div>

        <div class="cosmic-object col-md-3" v-on:click="setSelectedAsset(index+4)" v-for="(obj, index) in cosmicAssetObjs.slice(4,8)" :key="index+4">
           <cosmic-asset :cosmicObj="obj" :assetKey="index+4" class="cosmic-asset" />
        </div>

        <div class="cosmic-object col-md-3" v-on:click="setSelectedAsset(index+8)" v-for="(obj, index) in cosmicAssetObjs.slice(8)" :key="index+8">
           <cosmic-asset :cosmicObj="obj" :assetKey="index+8" class="cosmic-asset" />
        </div>
      </div>
    </div>
    <cosmic-page class="cosmic-page" v-if="selectedIndex != undefined" :cosmicObj="cosmicAssetObjs[selectedIndex]" /> -->
    <div class="footer">
      Proudly powered by <a href="s">Cosmic JS</a>
    </div>
  </div>
</template>

<script>
import HeaderArea from './Header.vue'
import CosmicAsset from './CosmicAsset.vue'
import CosmicPage from './CosmicPage.vue'

export default {
  components: {
    HeaderArea,
    CosmicAsset,
    CosmicPage
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
    const Cosmic = require('cosmicjs')()
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
      if (this.selectedIndex === index) {
        this.$store.commit('setSelectedCosmicIndex', undefined)
      } else {
        this.$store.commit('setSelectedCosmicIndex', index)
      }
    }
  },
  computed: {
    selectedIndex () {
      return this.$store.state.selectedCosmicIndex
    }
  }
}
</script>

<style scoped lang="css">
  .homescreen {
    height: 100vh;
    text-align: center;
    color: lightslategray;
  }

  .homescreen h1 {
    margin-top: 25px;
  }

  .text {
    color: white;
  }

  .cosmic-object-select {
    width: 80%;
    margin: 50px auto;
  }

  .cosmic-asset {
    cursor: pointer;
  }

  .cosmic-object {
    margin: 10px 0px;
  }

  .cosmic-page {
    height: 100%;
  }

  .footer {
    padding: 25px;
  }
</style>
