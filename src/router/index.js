import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods.vue'
import seller from '../components/seller/seller.vue'
import ratings from '../components/ratings/ratings.vue'
import register from '../components/register/register.vue'
// import addcartList from '../components/addcartList/addcartList.vue'
import commitOrderList from '../components/commit-orderList/commit-orderList.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [{
    path: '/good',
    component: goods,
    children: [
      {
        path: 'commitOrderList',
        component: commitOrderList
      }
    ]
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
    redirect: '/good'
  },
  {
    path: '/register',
    component: register
  }]
})
