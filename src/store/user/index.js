import { reqGetCode, reqUserRegister, reqUserLogin } from "@/api"

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
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETCODE(state, phone) {
        state.phone = phone
    },

    //登录业务
    USERLOGIN(state, token) {
        this.state.token = token
    }

}

const state = {
    phone: '',
    token: ''
}

const getter = {}

export default {
    actions,
    mutations,
    state,
    getter
}