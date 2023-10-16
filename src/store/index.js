import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/index.js'
import search from './search/index.js'
import detail from './detail/index.js'
import cart from './cart/index.js'
import user from './user/index.js'
import pay from './pay/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    home,
    search,
    detail,
    cart,
    user,
    pay
  }
})