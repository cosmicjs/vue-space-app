<template lang="html">
  <div class="homescreen">
    <div class="cosmic-object-selector" v-show="selectedIndex == undefined">
      <div class="cosmic-panel section">
        <navbar/>
        <div class="cosmic-selection-titles container">
          <h1> The Solar System.</h1>
          <h1> We live in it, why not learn more about it?</h1>
        </div>
      </div>
      
      <div class="cosmic-object-select row">
        <section class="section cosmic-object cosmic-panel" :class="generateSectionClass(index)" v-on:click="setSelectedAsset(index + 1)" v-for="(obj, index) in cosmicAssetObjs" :key="index">
           <cosmic-asset :heroMode="true" :cosmicObj="obj" :assetKey="index" class="cosmic-asset hero-asset" />
        </section>
        
        <!-- <div class="cosmic-object" v-on:click="setSelectedAsset(index + 1)" v-for="(obj, index) in cosmicAssetObjs.slice(1,4)" :key="index">
           <cosmic-asset :heroMode="true" :cosmicObj="obj" :assetKey="index" class="cosmic-asset" />
        </div>

        <div class="cosmic-object" v-on:click="setSelectedAsset(index+4)" v-for="(obj, index) in cosmicAssetObjs.slice(4,8)" :key="index+4">
           <cosmic-asset :heroMode="true" :cosmicObj="obj" :assetKey="index+4" class="cosmic-asset" />
        </div>

        <div class="cosmic-object" v-on:click="setSelectedAsset(index+8)" v-for="(obj, index) in cosmicAssetObjs.slice(8)" :key="index+8">
           <cosmic-asset :heroMode="true" :cosmicObj="obj" :assetKey="index+8" class="cosmic-asset" />
        </div> -->
      </div>
    </div>
    <cosmic-page class="cosmic-page" v-if="selectedIndex != undefined" :cosmicObj="cosmicAssetObjs[selectedIndex]" />
    <div class="footer">
      Proudly powered by <a href="s">Cosmic JS</a>
    </div>
  </div>
</template>
<script>

import Navbar from './Navbar.vue'
import CosmicAsset from './CosmicAsset.vue'
import CosmicPage from './CosmicPage.vue'

export default {
  components: {
    Navbar,
    CosmicAsset,
    CosmicPage
  },
  data() {
    return {
      // homepage data from Cosmic API
      homepageData: '',
      homepageContent: '',
      heroObj: {},
      cosmicAssetObjs: [],
      scrollOptions: {
      }
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
        this.heroObj = this.cosmicAssetObjs[0]
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
    },
    generateSectionClass (index) {
      return `cosmic-section-${index}`
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
  .cosmic-selection-titles {
    text-align: left;
    color: white;
  }
  .homescreen {
    height: 100vh;
    text-align: center;
    color: lightslategray;
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
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
    width: 100%;
  }
  
  .cosmic-asset.hero-asset {
    width: 100%;
  }

  .cosmic-object {
    width: 100%;
  }

  .cosmic-page {
    height: 100%;
  }

  .footer {
    padding: 25px;
  }
  
  .header-expo, .cosmic-panel {
    height: 100vh;
    scroll-snap-align: start;
  }
</style>
