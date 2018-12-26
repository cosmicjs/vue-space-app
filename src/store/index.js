import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    selectedCosmicIndex: undefined
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setSelectedCosmicIndex (state, index) {
      state.selectedCosmicIndex = index
    }
  }
})

export default store
