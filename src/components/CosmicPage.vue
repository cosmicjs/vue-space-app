<template lang="html">
  <div class="cosmic-page-component">
    <div class="row">
      <div class="page-left col-md-8">
        <img class="cosmic-page-image" :src="defaultImage" />
        <h3>{{cosmicTitle}}</h3>
        <div class="cosmic-page-content" v-html="cosmicContent"></div>
      </div>

      <div class="page-right col-md-4">
        <h2> Fun Facts: </h2>
        <div class="funFacts">
          <div class="funFact basic-fact card">
            <p>Galatic Type: {{type}}</p>
            <p>Size: {{size}}</p>
            <p>Distance From Earth: {{distanceFromEarth}}</p>
          </div>
          <div class="funFact card">
            {{funFact}}
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cosmicObj: {
      required: true
    }
  },
  mounted() {
  },
  watch: {
  },
  data() {
    return {}
  },
  methods: {
    returnToSelectPage() {
      this.$store.commit('setSelectedCosmicIndex', undefined)
    }
  },
  computed: {
    defaultImage() {
      let defaultImage
      if (!this.cosmicObj) return
      this.cosmicObj.metafields.map((field) => {
        if (field.title === 'default_image') return defaultImage = field.url
      })
      return defaultImage
    },
    funFact() {
      let funFact
      if (!this.cosmicObj) return
      this.cosmicObj.metafields.map((field) => {
        if (field.title === 'fact') return funFact = field.value
      })
      funFact = funFact.replace(/[^\w\s]/gi, '')
      return funFact
    },
    distanceFromEarth() {
      let data
      if (!this.cosmicObj) return
      this.cosmicObj.metafields.map((field) => {
        if (field.title === 'distanceFromEarth') return data = field.value
      })
      data = data.replace(/[^\w\s]/gi, '')
      return data
    },
    size() {
      let data
      if (!this.cosmicObj) return
      this.cosmicObj.metafields.map((field) => {
        if (field.title === 'size') return data = field.value
      })
      data = data.replace(/"/g,"")
      data = data.replace(/\\/g, '')
      return data
    },
    type() {
      let data
      if (!this.cosmicObj) return
      this.cosmicObj.metafields.map((field) => {
        if (field.title === 'type') return data = field.value
      })
      data = data.replace(/[^\w\s]/gi, '')
      return data
    },
    selectedAsset() {
      return this.$store.state.selectedCosmicIndex
    },
    cosmicTitle() {
      return this.cosmicObj && this.cosmicObj.title
    },
    cosmicContent() {
      return this.cosmicObj && this.cosmicObj.content
    }
  }
}
</script>

<style scoped lang="css">
  .return-to-select {
    font-size: 26px;
    text-align: left;
    margin: 5px 25px;
    cursor: pointer;
  }

  .cosmic-page-image {
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }

  .row {
    height: 100%;
  }

  .page-left {
    border-right: 1px solid blueviolet;
    height: 100%;
    padding: 25px;
  }

  .funFacts.row {
    height: auto;
  }

  .funFact {
    background-color: #000;
    border: 1px solid blueviolet;
    color: blueviolet;
    height: auto;
    margin: 10px;
  }

  .basic-fact {
    border: 1px solid cadetblue;
    color: cadetblue;
    text-align: left;
    padding: 10px;
  }
</style>
