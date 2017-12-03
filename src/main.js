// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import goods from './components/goods/goods.vue'
import seller from './components/seller/seller.vue'
import ratings from './components/ratings/ratings.vue'
import VueResource from 'vue-resource'
import './common/css/index.css'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip = false

let router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [{
    path: '/goods',
    component: goods
  },
  {
    path: '/seller',
    component: seller
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/',
    redirect: '/goods'
  }]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App></App>',
  components: { App }
})
