import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

// 重写push、replace方法，解决冗余导航问题
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve&&reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}

Vue.use(VueRouter)
const routes = [
  {
    path:'*',
    redirect:'/home'
  },
  {
    path:'/home',
    component:()=>import('@/views/Home/MyHome.vue')
  },
  // 搜索页
  {
    path:'/search/:keyword?',
    component:()=>import('@/views/Search/MySearch.vue'),
    name:'search'
  },
  // 详情页
  {
    path:'/detail/:skuId',
    component:()=>import('@/views/Detail/GoodDetail.vue'),
    name:'detail'
  },
  // 添加购物车成功
  {
    name:'addcartsuccess',
    path:'/addcartsuccess',
    component:()=>import('@/views/AddCartSuccess/index.vue'),
    meta:{
      // footer隐藏
      hidden:true,
      // 要登录
      login:true
    }
  },
  // 购物车
  {
    path:'/shopcart',
    component:()=>import('@/views/ShopCart/index.vue'),
    meta:{
      // footer隐藏
      hidden:true,
      login:true
    }
  },
  // 交易
  {
    path:'/trade',
    component:()=>import('@/views/Trade/index.vue'),
    meta:{
      login:true
    },
    beforeEnter: (to, from, next) => {
      // 点击结算才能进入交易页面
      if(from.path==='/shopcart'){
        next()
      }else{
        next(false)
      }
    }
  },
  // 支付
  {
    path:'/pay',
    component:()=>import('@/views/Pay/index.vue'),
    meta:{
      login:true
    },
    beforeEnter: (to, from, next) => {
      // 点击提交订单才能进入支付页面
      if(from.path==='/trade'){
        next()
      }else{
        next(false)
      }
    }
  },
  // 支付成功
  {
    path:'/paysuccess',
    component: ()=>import('@/views/PaySuccess/index.vue'),
    meta:{
      login:true
    },
    beforeEnter: (to, from, next) => {
      // 支付成功才能进入
      if(from.path==='/pay'){
        next()
      }else{
        next(false)
      }
    }
  },
  // 个人中心
  {
    path:'/center',
    component:()=>import('@/views/Center/index.vue'),
    children:[
      {
        path:'/center',
        redirect:'/center/myorder'
      },
      {
        path:'myorder',
        component:()=>import('@/views/Center/MyOrder/index.vue'),
        meta:{
          login:true
        }
      },
      {
        path:'grouporder',
        component:()=>import('@/views/Center/GroupOrder/index.vue'),
        meta:{
          login:true
        }
      }
    ]
  },
  {
    path:'/login',
    component:()=>import('@/views/Login/MyLogin.vue'),
    meta:{
      // footer隐藏
      hidden:true
    }
  },
  {
    path:'/register',
    component:()=>import('@/views/Register/MyRegister.vue'),
    meta:{
      // footer隐藏
      hidden:true
    }
  }
]
const router = new VueRouter({
  routes,
  scrollBehavior(to,from,savedPosition) {
    // to：要导航到的目标路由对象。
    // from：当前路由对象。
    // savedPosition：如果是通过浏览器前进/后退按钮导航的，则会传入之前保存的滚动位置，否则为 null。
    // 如果有 savedPosition，则返回保存的滚动位置
    if(savedPosition){
      return savedPosition
    }else{
      // 始终滚动到顶部
      return { y: 0 }
    }
  },
})

// 全局守卫
router.beforeEach(async (to,from,next)=>{
  // 判断有无token
  let token = localStorage.getItem('token')
  // next()
  if(token){
    if(to.path==='/login'||to.path=='/register'){
      next('/home')
    }else{
      try{
        await store.dispatch('userInfo')
        next()
      }catch(error){
        // 说明token已过期
        await store.dispatch('userExit')
        next('/login')
      }
    }
  }else{
    // console.log(to.meta)
    if(to.meta.login){
      next('/login?redirect='+to.path)
    }else{
      next()
    }
  }
})

export default router