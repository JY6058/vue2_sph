import {getSearchInfo} from '@/api/index.js'

const state = {
  searchInfo:{}
}
const mutations ={
  changeSearchInfo(state,data){
    state.searchInfo = data
  }
}
const actions = {
  async getSearchList({commit},params={}){
    let res = await getSearchInfo(params)
    console.log(res)
    if(res.data.code===200){
      commit('changeSearchInfo',res.data.data)
    }
  }
}
const getters = {
  attrsList(state){
    return state.searchInfo.attrsList || []
  },
  goodsList(state){
    return state.searchInfo.goodsList || []
  },
  trademarkList(state){
    return state.searchInfo.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}