//路由配置

//引入vue
import Vue from 'vue'

//引路由
import VueRouter from 'vue-router'

//应用路由配置组件
import routes from './routes'
//使用路由
Vue.use(VueRouter)


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
export default new VueRouter({
    routes,

    //路由滚动行为
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})