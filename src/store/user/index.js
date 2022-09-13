import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "@/api"
import { removeToken, getToken, setToken } from "@/utils/token"
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)  //如果是真正的开发 这里只发送请求就好了
        // console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data)
        }
    },

    //注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        console.log(result);
        if (result.code == 200) {
            return alert('注册成功')
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    //登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // console.log(result);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            setToken(result.data.token)
            return 'ok'

        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    //获取用户信息
    async userInfo({ commit }) {
        let result = await reqUserInfo()
        console.log(result);
        if (result.code == 200) {
            commit('USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    //退出登录
    async userLogout({ commit }) {
        let result = await reqUserLogout()
        // console.log(result);
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    //注册业务
    GETCODE(state, phone) {
        state.phone = phone
    },

    //登录业务
    USERLOGIN(state, token) {
        state.token = token
    },

    //获取用户信息
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },

    //退出登录 清楚本地数据
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}

const state = {
    phone: '',
    userInfo: {},
    token: getToken()
}

const getter = {}

export default {
    actions,
    mutations,
    state,
    getter
}