import Vue from 'vue'
import App from './App.vue'
import GlobalComponents from './components/global/index.js'
Vue.use(GlobalComponents)
var version = Number(Vue.version.split('.')[0])
console.log('qwe',location.href)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')