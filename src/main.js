import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import './plugins/element.js'
import 'echarts/lib/chart/map'
import 'echarts/map/js/province/yunnan.js'
// eslint-disable-next-line no-unused-vars
import  ExportExcel from './ExportExcel'

import axios from 'axios'
import Vuex from 'vuex'
Vue.config.productionTip = false
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
new Vue({
  router,
  Vuex,
  render: h => h(App)
}).$mount('#app')
