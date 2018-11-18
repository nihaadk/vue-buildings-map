// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import _ from 'lodash'
import * as VueGoogleMaps from "vue2-google-maps"

// Import VueGoogleMaps component
Vue.use(VueGoogleMaps, {
  load: {
    key: "", // add you Google MAPS API Key
    libraries: "places" // necessary for places input
  }
});

// Global def. lodash for all vue components
Object.defineProperty(Vue.prototype, '$_', { value: _ });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
