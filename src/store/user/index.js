import {getCode,register,login,getUserInfo,logout} from '@/api/index.js'
const state ={
  // 验证码
  code:'',
  token:localStorage.getItem('token'),
  userInfo:{}
}
const mutations = {
  changeCode(state,data){
    state.code = data
  },
  changeToken(state,data){
    state.token = data
  },
  changeUserInfo(state,data){
    state.userInfo = data
  }
}
const actions = {
  // 验证码
  async reqCode({commit},phone){
    let res = await getCode(phone)
    // console.log(res)
    if(res.data.code===200){
      commit('changeCode',res.data.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 注册
  async registerUser({commit},data){
    let res = await register(data)
    if(res.data.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 登录
  async userLogin({commit},{phone,password}){
    let res = await login(phone,password)
    console.log(res)
    if(res.data.code===200){
      commit('changeToken',res.data.data.token)
      localStorage.setItem('token',res.data.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error(res.data.message))
    }
  },
  // 获取用户信息
  async userInfo({commit}){
    let res = await getUserInfo()
    if(res.data.code===200){
      commit('changeUserInfo',res.data.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 退出登录
  async userExit({commit}){
    let res = await logout()
    if(res.data.code===200){
      // 清除token
      commit('changeToken','')
      commit('changeUserInfo',{})
      localStorage.removeItem('token')
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
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