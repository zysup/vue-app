import Vue from 'vue'
import App from './App.vue'
import GlobalComponents from './components/global/index.js'
// import Vconsole from "vconsole";
// var vConsole = new Vconsole();

let ipaddress = (() => {
  let ip = "";
  const interfaces = require("os").networkInterfaces();
  Object.keys(interfaces).forEach(devName => {
    const iface = interfaces[devName],
      found = iface.filter(
        alias => {
          alias.family === "IPv4" &&
            alias.address !== "127.0.0.1" &&
            !alias.internal
        }
      )
    if (found.length) ip = found[0].address;
  })
  return ip;
})()
console.log("qwe",ipaddress);  //为什么取不到呢？

Vue.use(GlobalComponents)
var version = Number(Vue.version.split('.')[0])
console.log('qwe', location.href)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
