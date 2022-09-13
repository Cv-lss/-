//vuex模块化
import Vue from 'vue'
import Vuex from 'vuex'

//使用Vuex
Vue.use(Vuex)

//引入每一个小仓库 
import home from './home'
import search from './search'
import detail from './detail'
import cartlist from './shopcart'
import user from './user'
import trade from './trade'
//创建vuex的实例对象并暴露 (store)
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        cartlist,
        user,
        trade,
    }
})