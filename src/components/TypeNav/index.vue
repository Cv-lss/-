<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="leaveShow" @mouseenter="enterShow">
          <h2 class="all">全部商品分类</h2>

          <!-- 三级联动结构 -->
          <transition name="sort">
            <div class="sort" @click="goSearch" v-show="show">
              <div class="all-sort-list2">
                <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                  :class="{ cur: currentIdenx == index }">
                  <h3 @mouseenter="changeIndex(index)">
                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                  </h3>

                  <!-- 二级，三级分类结构 -->
                  <div class="item-list clearfix" :style="{ display: currentIdenx == index ? 'block' : 'none' }">
                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryTd">
                      <dl class="fore">
                        <dt>
                          <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                          }}</a>
                        </dt>
                        <dd>
                          <em v-for="c3 in c2.categoryChild" :key="c3.categoryTd">
                            <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                            }}</a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle"; //引入节流插件
export default {
  name: "TypeNav",
  data() {
    return {
      currentIdenx: -1, //存储用户鼠标进入哪一个一级分类
      show: true, // 界面进入到搜索页面变化隐藏
    };
  },

  mounted() {

    //如果页面进入到搜索页面 商品分类就是false 隐藏起来
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    //鼠标进入响应式数据currentIdenx属性
    //鼠标移入某一个元素的索引值
    //利用节流插件 来防止用户快速操作出现的卡顿
    changeIndex: throttle(function (index) {
      this.currentIdenx = index;
    }, 50),


    //实现点击跳转到搜索界面
    goSearch(event) {
      //把子节点的a标签身上绑定自定义属性 data-categoryname 其他子节点是没有这个的
      let element = event.target;
      // console.log(element.dataset);

      let { categoryname, category1id, category2id, category3id } =
        element.dataset;

      //节点有一个dataset属性 可以获取节点的自定义属性和属性值
      //如果标签身上有categorname一定是a标签
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };

        //一级 二级 三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //判断有没有parmas 
        if (this.$route.params) {
          //有parmas就在location动态添加一个parmas属性
          location.params = this.$route.params

          //给location动态添加一个query属性
          location.query = query;

          //实现路由跳转
          // console.log(location,query);
          this.$router.push(location);
        }
      }
    },

    enterShow() {  // 鼠标移入显示分类列表
      this.show = true
    },
    leaveShow() {
      this.currentIdenx = -1; //鼠标移除背景色变没有

      if (this.$route.path != '/home') {  //判断鼠标移除的是哪了 如果不是home在隐藏
        this.show = false
      }

    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.2s linear;
    }

  }
}
</style>