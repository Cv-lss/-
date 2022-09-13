import { reqOrderInfo, reqUserAddressInfo } from "@/api"

const actions = {
    //获取地址信息
    async getUserAddressInfo({ commit }) {
        let result = await reqUserAddressInfo()
        // console.log(result);
        if (result.code == 200) {
            commit('GETUSERADDRESSINFO', result.data)
        }
    },

    //获取商品的信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        // console.log(result);
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    }
}

const mutations = {
    //用户地址信息
    GETUSERADDRESSINFO(state, addressInfo) {
        state.addressInfo = addressInfo
    },

    //用户选的商品信息
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }

}

const state = {
    //地址信息 默认给个空数组
    addressInfo: [],

    //商品信息
    orderInfo: {}
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}