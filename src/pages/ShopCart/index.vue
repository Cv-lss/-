<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="upDateChecked(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>


      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ tatolPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getCartList')
    },

    //修改某一个产品的数量  防止用户点击过快出现负数 要用节流阀 
    handler: throttle(async function (type, disNum, cart) {
      //第一个参数是 区分这三个元素
      //第二个参数 变化量加1 或者-1 input最终的个数
      //第三个参数 哪一个产品 {身上有id}
      switch (type) {
        //加号
        case 'add':
          disNum = 1
          break;
        //减号
        case 'minus': //要判断是不是大于1 如果大于一才可以减 如果小于一就等于0 
          disNum = cart.skuNum > 1 ? -1 : 0
          break
        //用户输入的数量
        case 'change':
          //如果用户输入的是非法的 和小于1的 带给服务器的数量就是0
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            //如果有小数就取整带给服务器
            disNum = parseInt(disNum) - cart.skuNum
          }
          break
      }

      //要派发action
      try {
        //代表的是修改成功
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        //修改成功后再次发起请求 获取新的数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }

    }, 1000),


    //删除购物车某一个商品
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch('deleteCartListById', cart.skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },

    // //某一个产品的勾选状态
    async upDateChecked(cart, event) {
      // console.log(cart, event);
      //如果勾选是true不勾选是false 但是不能是布尔值 所以用1和0代替 
      let isChecked = event.target.checked ? '1' : '0'
      // console.log(isChecked);
      try {
        //如果成功就派发action
        await this.$store.dispatch('updateCheckedById', { skuId: cart.skuId, isChecked })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },

    //删除选中的商品
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },

    //全选按钮
    async updateAllCartChecked(event) {
      try {
        //判断是不是已经勾选了 如果已经勾选就不动
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updateAllCartChecked', isChecked)
        this.getData()
      } catch (error) {
        console.log(error.message)
      }
    }
  },



  computed: {
    //这个不是想要的数据 
    ...mapGetters(['cartList']),
    //这个是想要的数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    //计算总价
    tatolPrice() {
      let sum = 0
      this.cartInfoList.forEach(itme => {
        sum += itme.skuNum * itme.skuPrice
      })
      return sum
    },
    //计算全选框
    isAllCheck() { //every是数组的方法 如果都想等就是 true 有一个就是false
      return this.cartInfoList.every(itme => itme.isChecked == 1)
    }

  }
}
</script>



<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }



        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>