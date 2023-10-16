import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const request = axios.create({
  baseURL:'/api',
  timeout:5000
})

request.interceptors.request.use((config)=>{
  if(store.state.detail.uuid){
    // 跟后端商量好的 字段 userTempId
    config.headers.userTempId = store.state.detail.uuid
  }
  if(localStorage.getItem('token')){
    config.headers.token = localStorage.getItem('token')
  }
  nProgress.start()
  return config
})
request.interceptors.response.use((res)=>{
  nProgress.done()
  return res
},(err)=>{
  return Promise.reject(err)
})

export default request