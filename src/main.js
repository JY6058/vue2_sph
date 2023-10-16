import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import MySwiper from '@/components/Swiper/MySwiper.vue'
import MyPagination from '@/components/Pagination/MyPagination.vue'
import {MessageBox} from 'element-ui'
// import {getCategoryList} from './api/index.js'

Vue.config.productionTip = false
// getCategoryList().then(res=>{console.log(res)})

import '@/mock/mockServe.js'

Vue.component(TypeNav.name,TypeNav)
Vue.component(MySwiper.name,MySwiper)
Vue.component(MyPagination.name,MyPagination)

// 注册组件时，将element-ui组件挂载到原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import logo from '@/assets/logo.png'
Vue.use(VueLazyload, {
  // 懒加载默认加载图片
  loading: logo
})

import * as API from '@/api/index.js'
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
