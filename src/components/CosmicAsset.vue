<template lang="html">
  <div class="cosmic-asset-component">
    <img class="cosmic-image" :src="defaultImage" />
    <div class="cosmic-asset-details" v-show="selectedAsset==assetKey">
      <div class="cosmic-content" v-html="cosmicContent"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cosmicObj: {
      required: true,
      type: Object
    },
    assetKey: {
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    defaultImage() {
      let defaultImage
      this.cosmicObj.metafields.map((field) => {
        if (field.title === 'default_image') return defaultImage = field.url
      })
      console.log(defaultImage)
      return defaultImage
    },
    selectedAsset() {
      return this.$store.state.selectedCosmicIndex
    },
    cosmicContent() {
      return this.cosmicObj.content
    }
  }
}
</script>

<style lang="css">
  .cosmic-asset {
    color: white;
  }
  .cosmic-image {
    height: 100px;
    width: 100px;
  }
</style>
