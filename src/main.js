import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Store from './store/index.js'

Vue.use(Vuex)

import 'bootstrap';
import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  store: Store
})
