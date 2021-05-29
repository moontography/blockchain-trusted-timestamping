import Vue from 'vue'
import store from './vuex/store'
import BlockchainFileTimestamping from './BlockchainFileTimestamping.vue'

import './components'

import 'bootstrap'
import './scss/app.scss'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(BlockchainFileTimestamping),
  store,
}).$mount('#app')
