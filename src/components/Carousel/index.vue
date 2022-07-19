<!-- 全局封装的轮播图组件 -->
<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
            <!-- <div class="swiper-slide">
                                            <img src="./images/floor-1-b02.png">
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="./images/floor-1-b03.png">
                                        </div> -->
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name: 'Carousel',
    props: ['list'],

    watch: { //监听数据变化
        list: { //监听bannerList 如果用对象 里面必须有handler回调函数
            immediate: true, // 立即监听 不管你有没有数据 上来就监听一次
            handler() {
                this.$nextTick(() => {  //nextTick 是在下次dom更新 循环结束之后 执行延迟回调函数 在修改数据之后 立即使用这个方法 获取更新后的dom
                    //如果不用nextTick直接监听数据变化 轮播图效果是没有的 因为v-for还在遍历也需要时间 结构还没有出来 swiper就没办法使用
                    //初始化Swiper类的实例
                    var mySwiper = new Swiper(this.$refs.cur, {
                        //开启循环模式
                        loop: true,
                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },

                    });
                })
            }
        }
    }
}
</script>

<style>
</style>