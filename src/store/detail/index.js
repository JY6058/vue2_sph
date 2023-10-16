import {getDetail,addShopcat} from '@/api/index.js'
import {getUuid} from '@/utils/uuid_token.js'
const state = {
  DetailList:{},
  // 游客id
  uuid:getUuid()
}
const mutations = {
  changeDetailList(state,data){
    state.DetailList = data
  }
}
const actions = {
  async getDetail({commit},id){
    let res = await getDetail(id)
    if(res.data.code===200){
      commit('changeDetailList',res.data.data)
    }
  },
  async addShopcat({commit},{skuId,skuNum}){
    console.log(commit)
    let res = await addShopcat(skuId,skuNum)
    console.log(res)
    if(res.data.code===200){
      return 'ok'
    }else{
      return Promise.reject('fail')
    }
  }
}
const getters = {
  skuInfo:state=>state.DetailList.skuInfo||{},
  categoryView:state=>state.DetailList.categoryView||{},
  spuSaleAttrList:state=>state.DetailList.spuSaleAttrList||[]
}

export default {
  state,
  mutations,
  actions,
  getters
}