//对axios进行二次封装======================================

import axios from 'axios';

//网页响应进度条
// import nprogress from 'nprogress'; // nprogress是一个对象  里面的done是结束 start是开始
//引入进度条样式
// import 'nprogress/nprogress.css';

//利用axios对象的方法 create，去创建一个axios实例对象
//request 就是axios 只不过是稍微配置下
const requests = axios.create({
    baseURL: '/mock', //基础路径 发请求的时候路径里出现的/api
    timeout: 5000,  //请求超过5秒就失败
})

// 添加请求拦截器 在请求发送之前 请求拦截器可以检测到 可以在请求之前做一些事情
axios.interceptors.request.use((config) => {
    //请求开始时 进度条显示
    // nprogress.start()

    //consign：配置对象，对象里面有一个属性很重要 里面的headers请求头
    return config;
})

// 添加响应拦截器
axios.interceptors.response.use((res) => {
    //进度条结束
    // nprogress.done()
    // console.log(res.data);
    //成功的回调，服务器数据回来以后，拦截器可以响应到 可以做一些事情
    return res.data
},  // 响应失败的回调 对响应错误做点什么
    (error) => {
        return Promise.reject(new Error('faile'))
    })


export default requests;