import { reqGetSearchInfo } from "@/api"

//search的vuex 小仓库
const actions = {   //可以书写业务逻辑 也可以处理异步
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params) //这个函数被调用的时候至少传递一个空对象 不然会报错
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = { //用于操作数据 修改state唯一手段
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList

    }
}
const state = {   //仓库存储数据的地方

    searchList: {},

}
//getters:仓库的计算属性
//项目中:vuex的getters,为了简化数据而生。
const getters = {

    //计算新的属性:state,当前小仓库的数据
    // goodsList(state) {
    //     console.log(state);
    //     return state.searchList.data.goodsList || [];
    // },

    goodsList(state) {
        return state.searchList.goodsList || []
    },


    attrsList(state) {
        // console.log(state);
        return state.searchList.attrsList || [];
    },

    trademarkList(state) {
        // console.log(state);
        return state.searchList.trademarkList || [];
    },

    total(state) {
        return state.searchList.total || [];
    }
    // data(state) {
    //     return state.searchList.data || {};

    // },

    // goodsList(state, getters) {
    //     return getters.data.goodsList || [];
    // },

    // attrsList(state, getters) {
    //     // console.log(state);
    //     return getters.data.attrsList || [];
    // },


    // trademarkList(state, getters) {
    //     // console.log(state);
    //     return getters.data.trademarkList || [];
    // },

    // total(state, getters) {
    //     return getters.data.total || [];
    // }
};


export default {
    actions,
    mutations,
    state,
    getters,
}