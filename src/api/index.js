//当前这个模块 对Api进行统一管理

//引入封装好的 axios
import requests from './request'
import mockRequests from './mockRequest'
//对外暴露这个统一管理模块 只要外部调用这个函数 就发起ajax请求
//  /api/product/getBaseCategoryList  无参数
// export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')


//获取mock的数据 container轮播图
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor轮播图数据
export const reqGetFloorList = () => mockRequests.get('/floor')



//获取搜索页面的数据
export const reqGetSearchInfo = (data) => requests({ url: '/list', method: 'post', data })



//详情页数据
export const reqGoodInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get', })
// export const reqGoodInfo = (skuId) => mockRequests({ url: `/detail/${skuId}`, method: 'get' })


//切换购物车数据
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })


//购物车模块数据
export const reqCartList = () => requests({ url: `/cart/cartList`, method: 'get' })


//删除购物车某一个商品
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

//购物车商品选中状态
export const reqUpdateCheckById = (skuId, isChecked) => requests({ url: `cart/checkCart/${skuId}/${isChecked}`, method: 'get' })


//注册验证码请求  /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `user/passport/sendCode/${phone}`, method: 'get' })


//注册的数据/api/user/passport/register
export const reqUserRegister = (data) => requests({ url: `user/passport/register`, data, method: 'post' })

//登录接口/api/user/passport/login
export const reqUserLogin = (data) => requests({ url: `user/passport/login`, data, method: 'post' })

//登录成功后发送请求获取用户信息 带token
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })

//退出登录的请求地址 /api/user/passport/logout
export const reqUserLogout = () => requests({ url: `/user/passport/logout`, method: 'get' })

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
export const reqUserAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })

//获取用户订单交易信息页 /api/order/auth/trade
export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: 'get' })

//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

//获取订单支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取订单支付中信息/api/payment/weixin/createNative/{orderId}
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取我的订单信息/api/order/auth/{page}/{limit}
export const reqMyOrderInfo = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
