import Vue from 'vue'
import store from './vuex/store'
import XlmFile from './XlmFile.vue'

import 'papercss'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(XlmFile),
  store,
}).$mount('#app')
