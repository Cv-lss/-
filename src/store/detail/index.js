//详情页面的Vuex
import { reqGoodInfo, reqAddOrUpdateShopCart } from '@/api'
//封装的临时身份
import { getUUID } from '@/utils/uuid_token'



const actions = {
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodInfo(skuId)
        // console.log(result);
        if (result.code == 200) {
            // console.log(result.data.data);
            commit('GETGOODINFO', result.data)
            // console.log(result.data.data);
        }
    },

    //将产品添加进入购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETGOODINFO(state, goodInfo) {
        // console.log(goodInfo);
        state.goodInfo = goodInfo
    }
}


const state = {
    goodInfo: {},

    //游客临时身份
    uuid_token: getUUID()
}



const getters = {

    //面包屑的数据
    categoryView(state) {
        //研究这个问题:
        //起始状态:state.detailInfo起始状态空对象,空对象.categoryView->undefined
        //当服务器数据回来之后state.detailInfo,并非空对象,获取的即为服务器返回的数据{7个K}
        //当前属性值:服务器的数据有值，用服务器的。服务器数据没有回来至少有一个空对象兜底【不能undefined兜底】
        return state.goodInfo.categoryView || {}
    },
    //商品信息的数据
    skuInfo() {
        return state.goodInfo.skuInfo || {}
    },
    //商品销售属性列表的数据
    spuSaleAttrList() {
        return state.goodInfo.spuSaleAttrList || []
    }









    // tetailData(state) {
    //     // console.log(state);
    //     return state.goodInfo || {}
    // },

    // categoryView(state, getters) {
    //     // console.log(state, getters)
    //     // console.log(state);
    //     return getters.tetailData.categoryView || {}
    // },
    // skuInfo(state, getters) {
    //     // console.log(getters);

    //     return getters.tetailData.skuInfo || {}

    // },

    // spuSaleAttrList(state, getters) {
    //     return getters.tetailData.spuSaleAttrList || []
    // }





    // categoryView(state) {
    //     // console.log(state);
    //     return state.goodInfo.categoryView || {}
    // },

    // skuInfo(state) {
    //     // console.log(state);
    //     return state.goodInfo.skuInfo || {}
    // },


}

export default {
    actions,
    mutations,
    state,
    getters,

}