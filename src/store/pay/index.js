import {userAddress} from '@/api/index.js'
const state = {
  userAddress:[]
}
const mutations = {
  changeAddress(state,data){
    state.userAddress = data
  }
}
const actions = {
  async getUserInfo({commit}){
    let res = await userAddress()
    if(res.data.code===200){
      commit('changeAddress',res.data.data)
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