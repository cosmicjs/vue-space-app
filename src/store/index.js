import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZXkuam95MjFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIwZjNkYjVkNDEwNTQ1MmRiZjg0ZjgzYWNmYzkzMmE4NCIsImlhdCI6MTU0NTc3MTY0Nn0.gMT3fHkkBOdIsXpnlxomwXhHFIBm8ehCCB4UYVGUbJg',
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
