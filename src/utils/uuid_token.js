
//引入uuid这个插件
import { v4 as uuidv4 } from 'uuid'

//对外暴露uuid 要生成一个随机字符串 没次执行不能改变

export const getUUID = () => {
    //先看看本地存储有没有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有就把uuid的字符串存进去
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    //这里必须要有返回值
    return uuid_token
}