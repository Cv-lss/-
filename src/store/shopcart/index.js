import { reqCartList, reqDeleteCartById, reqUpdateCheckById } from "@/api"


const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        // console.log(result);
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },

    //删除购物车商品
    async deleteCartListById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    //购物车状态切换
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    //删除选中的商品 纯仓库
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        //购物车全部的商品是一个数组
        getters.cartList.cartInfoList.forEach(itme => {
            let Promise = itme.isChecked == 1 ? dispatch('deleteCartListById', itme.skuId) : ''
            PromiseAll.push(Promise)
        })
        //promise.all是如果一个失败就是全是失败
        return Promise.all(PromiseAll)
    },

    //全选按钮
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList.cartInfoList.forEach(itme => {
            let Promise = dispatch('updateCheckedById', { skuId: itme.skuId, isChecked })
            PromiseAll.push(Promise)
        })
        return Promise.all(PromiseAll)
    }
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

const state = {
    cartList: []
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    actions,
    mutations,
    state,
    getters,
}