//home的vuex  小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api' //引入封装好的axios

const actions = {   //可以书写业务逻辑 也可以处理异步
    async categoryList({ commit }) {
        //获取服务器的数据,存储在vuex仓库中
        //reqCategory函数执行,返回的是Promise对象【pending、成功、失败】
        //await 等待成功的结果
        let result = await reqCategoryList();
        //判断服务器返回的状态是200->成功
        if (result.code == 200) {
            //提交mutation存储服务器数据
            commit("GETCATEGORY", result.data);
        }
    },

    //container轮播图数据=========================================
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        // console.log(result);
        if (result.data.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },

    //floor轮播图数据=====================================================
    async getFloorList({ commit }) {
        let result = await reqGetFloorList()
        // console.log(result);
        if (result.data.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}

const mutations = { //用于操作数据 修改state唯一手段
    GETCATEGORY(state, categoryList) {
        state.categoryList = categoryList;
    },

    //container轮播图================================================
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },

    //floor数据=======================================================
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}


const state = {   //仓库存储数据的地方
    categoryList: [],//起始值就是个空数组
    bannerList: [],
    floorList: []
}

const getters = {  //可以理解为计算属性 用于简化仓库的数据

}

export default {
    actions,
    mutations,
    state,
    getters,
}