<template>
  <div>
    <Header></Header>
    <!-- //路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    this.$store.dispatch("categoryList"); //组件挂载完毕 可以向服务器发送请求 放在app组件里不用一直发送请求 性能比较好

  }
};
</script>


