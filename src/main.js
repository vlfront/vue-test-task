import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import moment from 'vue-moment'

Vue.use(VueResource)
Vue.use(moment)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch('fetchData');
  },
  render: h => h(App)
}).$mount('#app')
