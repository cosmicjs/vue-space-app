<template lang="html">
  <div>
    <div class="cosmic-asset-component card" v-if="!imageMode && !heroMode">
      <img class="cosmic-image card-img-top" :src="defaultImage" />
      <div class="card-body">
        <h5 class="cosmic-name card-title">
          {{cosmicObj.title}}
        </h5>
      </div>
    </div>
    <div class="asset-image-mode" v-else>
      <img class="cosmic-image" :src="defaultImage" :class="[heroMode ? 'heroImgClass' : '']" />
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
    },
    imageMode: {
      required: false,
      type: Boolean
    },
    heroMode: {
      required: false,
      type: Boolean
    }
  },
  data() {
    return {}
  },
  computed: {
    defaultImage() {
      let defaultImage
      this.cosmicObj && this.cosmicObj.metafields && this.cosmicObj.metafields.map((field) => {
        if (field.title === 'default_image') return defaultImage = field.url
      })
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

<style scoped lang="css">
  .card {
    background-color: #000;
    border: 1px solid blueviolet;
    color: blueviolet;
  }

  .cosmic-image {
    height: 150px;
    width: 150px;
    margin: 10px auto;
    border-radius: 50%;
  }

  .cosmic-name {
    text-align: center;
  }
  
  .cosmic-image.heroImgClass {
    height: 500px;
    width: 500px;
    display: block;
  }
</style>
