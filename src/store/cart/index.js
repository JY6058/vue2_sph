import {getCartList,deleteCartShop,taggleChecked} from '@/api/index.js'
const state = {
  cartList:[]
}
const mutations = {
  changeCartList(state,data){
    state.cartList = data
  }
}
const actions = {
  // 获取购物车列表
  async getCartList({commit}){
    let res = await getCartList()
    // console.log(res)
    if(res.data.code===200){
      commit('changeCartList',res.data.data)
    }
  },
  // 删除购物车商品
  async deleteCartGood({commit},skuId){
    let res = await deleteCartShop(skuId)
    if(res.data.code===200){
      return 'ok'
    }else{
      return Promise.reject('fail')
    }
  },
  // 切换选中状态
  async taggleChecked({commit},{skuId,isChecked}){
    let res = await taggleChecked(skuId,isChecked)
    if(res.data.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  //却换 全选
  taggleAllisChecked({dispatch,state},isChecked){
    // console.log(state.cartList[0].cartInfoList)
    let promise = []
    let cartList = state.cartList[0].cartInfoList
    cartList.forEach(item=>{
      let res = dispatch('taggleChecked',{skuId:item.skuId,isChecked})
      promise.push(res)
    })
    return Promise.all(promise)
  },
  // 删除所有选中的商品
  deleteAllChecked({dispatch,state}){
    let allPromise = []
    state.cartList[0].cartInfoList.forEach(item=>{
      let promise = item.isChecked===1?dispatch('deleteCartGood',item.skuId):''
      allPromise.push(promise)
    })
    return Promise.all(allPromise)
  }
}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}