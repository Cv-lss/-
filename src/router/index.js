//路由配置

//引入vue
import Vue from 'vue'

//引路由
import VueRouter from 'vue-router'

//应用路由配置组件
import routes from './routes'
//使用路由
Vue.use(VueRouter)

//引入仓库
import store from '@/store'

//重新写push || replace

let originPush = VueRouter.prototype.push  // 以前的push属性要保存
let originReplace = VueRouter.prototype.replace


VueRouter.prototype.push = function (location, resolve, reject) { //第一个参数 往哪里跳转 第二个 成功参数 第三个 失败参数
    if (resolve && reject) {
        originPush.call(this, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}


VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve, reject) {
        originReplace.call(this, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//创建路由实例并暴露
let router = new VueRouter({
    routes,

    //路由滚动行为
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})


//全局路由守卫
router.beforeEach(async (to, from, next) => {
    // console.log(to);
    // next()
    let token = store.state.user.token
    let name = store.state.user.userInfo.name

    if (token) { //如果有token 就代表是登录了
        if (to.path == '/login') { //如果用户登录就不能去登录页面了 login
            next('/home') //直接显示首页
        } else {
            if (name) { //如果仓库里面有用户信息 就放行
                next()
            } else { //如果仓库里面没有用户信息 就派发请求 
                try {
                    //发送请求 获取用户信息在首页展示
                    await store.dispatch('userInfo')
                    next()
                } catch (error) { //还有一种情况是 token过期了 就派发登录请求 回到登录页面
                    await store.dispatch('userLogout')
                }
            }
        }
    } else { //未登录不能去交易相关的页面 
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            //如果去的不是上面的页面就放行
            next()
        }

    }
})








export default router

