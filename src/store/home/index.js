import {getCategoryList,getBannerList,getFloorList} from '@/api/index.js'
const state={
  categoryList:[],
  bannerList:[],
  floorList:[]
}
const mutations = {
  changeCategoryList(state,data){
    state.categoryList = data
  },
  changeBannerList(state,data){
    // console.log('数据修改了')
    state.bannerList = data
  },
  changeFloorList(state,data){
    state.floorList = data
  }
}
const actions = {
  async categoryList({commit}){
    let res = await getCategoryList()
    // console.log(res)
    if(res.data.code===200){
      commit('changeCategoryList',res.data.data)
    }
  },
  async bannerList({commit}){
    // console.log('actions')
    let res = await getBannerList()
    if(res.data.code===200){
      commit('changeBannerList',res.data.data)
    }
  },
  async floorList({commit}){
    let res = await getFloorList()
    if(res.data.code===200){
      commit('changeFloorList',res.data.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}