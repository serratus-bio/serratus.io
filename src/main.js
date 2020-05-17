import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import Home from './pages/Home.vue'
import About from './pages/Why.vue'
import Info from './pages/Info.vue'
import Landing from './components/Landing.vue'

var VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo)
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

// component: () => import('../views/Dashboard.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Landing },
  { path: '/About', component: About },
  { path: '/Info', component: Info }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
