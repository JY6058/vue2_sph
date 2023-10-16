import {v4 as uuidv4} from 'uuid'
export const getUuid = ()=>{
  let uuid = localStorage.getItem('uuid_token')
  if(!uuid){
    uuid = uuidv4()
    localStorage.setItem('uuid_token',uuid)
  }
  return uuid
}