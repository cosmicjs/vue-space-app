<template lang="html">
  <div class="cosmic-page-component">
    <div class="row">
      <div class="page-left col-md-4">
        <div class="return-to-select">
          Back
        </div>
        <img class="cosmic-page-image" :src="defaultImage" />
        <h3>{{cosmicTitle}}</h3>
        <div class="cosmic-page-content" v-html="cosmicContent"></div>
      </div>

      <div class="page-right col-md-8">

      </div>
    </div>


    <!-- <div class="cosmic-content" v-html="cosmicContent"></div> -->
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
    console.log(this.cosmicObj)
  },
  data() {
    return {}
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
    selectedAsset() {
      return this.$store.state.selectedCosmicIndex
    },
    cosmicTitle() {
      return this.cosmicObj.title
    },
    cosmicContent() {
      return this.cosmicObj.content
    }
  }
}
</script>

<style scoped lang="css">
  .return-to-select {
    font-size: 26px;
    text-align: left;
    margin: 5px 25px;
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
  }

</style>
