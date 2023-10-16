// 统一管理api接口
import request from './request.js'
import mockAjax from './mockAjax.js'

export const getCategoryList = ()=>request({url:'/product/getBaseCategoryList'})

export const getBannerList = ()=>mockAjax({url:'/banner'})

export const getFloorList = ()=>mockAjax({url:'/floor'})

// 获取search数据
export const getSearchInfo = (params)=>request({url:'/list',method:'post',data:params})

// 获取详情detail数据
export const getDetail = (skuId)=>request({url:`/item/${skuId}`,mathod:'get'})

// 添加到购物车
export const addShopcat = (skuId,skuNum)=>request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表数据
export const getCartList = ()=>request({url:'/cart/cartList'})

// 删除购物车商品
export const deleteCartShop = (skuId)=>request({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 切换商品选中状态
export const taggleChecked = (skuId,isChecked)=>request({url:`/cart/checkCart/${skuId}/${isChecked}`})

// 注册时，获取验证码
export const getCode = (phone)=>request({url:`/user/passport/sendCode/${phone}`})

// 注册用户
export const register = (data)=>request({url:'/user/passport/register',method:'post',data})

// 登录
export const login = (phone,password)=>request({url:'/user/passport/login',method:'post',data:{phone,password}})

// 获取用户信息
export const getUserInfo = ()=>request({url:'/user/passport/auth/getUserInfo'})

// 退出登录
export const logout = ()=>request({url:'/user/passport/logout'})

// 获取用户地址信息
export const userAddress = ()=>request({url:'/user/userAddress/auth/findUserAddressList'})

// 获取订单交易页数据
export const tradeData = ()=>request({url:'/order/auth/trade'})

// 提交订单
export const submitTrade = (tradeNo,data)=>request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})

// 获取订单支付信息
export const getPayInfo = (orderId)=>request({url:`/payment/weixin/createNative/${orderId}`})

// 查询订单支付状态
export const payStatus = (orderId)=>request({url:`/payment/weixin/queryPayStatus/${orderId}`})

// 获取我的订单数据
export const myOrderList = (page,limit)=>request({url:`/order/auth/${page}/${limit}`})