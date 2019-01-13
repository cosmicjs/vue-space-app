<template lang="html">
  <div class="cosmic-asset-component card">
    <img class="cosmic-image card-img-top" :src="defaultImage" />
    <div class="card-body">
      <h5 class="cosmic-name card-title">
        {{cosmicObj.title}}
      </h5>
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
    border: 1px solid lightslategray;
    color: cadetblue;
  }
  
  .card:hover {
    transform: scale(1.05);
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
</style>
