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
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked===1" @click="taggleChecked(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice.toFixed(2)}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handle('minus',-1,item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="handle('change',$event.target.value*1,item)">
            <a href="javascript:void(0)" class="plus" @click="handle('add',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum*item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShop(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='isAllChecked' @click="taggleAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteChecked">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{sumCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{sumPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState} from 'vuex'
import throttle from 'lodash/throttle'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()
    },
    computed:{
      ...mapState({
        cartList:state=>state.cart.cartList
      }),
      // 简化购物车数据
      cartInfoList(){
        return (this.cartList[0]||{}).cartInfoList||[]
      },
      // 总的商品数
      sumCount(){
        let arr = this.cartInfoList.filter(item=>item.isChecked===1)
        return arr.reduce((sum,item)=>sum+item.skuNum,0)
      },
      // 计算总价
      sumPrice(){
        let arr = this.cartInfoList.filter(item=>item.isChecked===1)
        let sum = 0
        for(let i=0; i<arr.length; i++){
          sum += arr[i].skuNum*arr[i].skuPrice
        }
        return sum
      },
      // 全选状态
      isAllChecked(){
        return this.cartInfoList.every(item=>item.isChecked===1)
      }
    },
    methods:{
      getData(){
        this.$store.dispatch('getCartList')
      },
      // 修改购物车数量
      handle:throttle(async function(type,num,cart){
        // console.log(type,num,typeof(num))
        switch (type){
          case 'add':
            num = 1;
            break;
          case 'minus':
            num = cart.skuNum>1?-1:0;
            break;
          case 'change':
            if(isNaN(num)){
              num = 0
            }else if(num<0){
              num = 0
            }else{
              num = parseInt(num)-cart.skuNum
            }
            break;
        }
        try{
          await this.$store.dispatch('addShopcat',{skuId:cart.skuId,skuNum:num})
          this.getData()
        }catch(error){
          alert(error.message)
        }
      },1000),
      // 节流
      // throttle(fn,t){
      //   let timer = null
      //   return function(){
      //     if(!timer){
      //       timer = setTimeout(()=>{
      //         fn()
      //         timer = null
      //       },t)
      //     }
      //   }
      // },
      // 删除购物车商品
      deleteShop:throttle(async function(skuId){
        try{
          await this.$store.dispatch('deleteCartGood',skuId)
          this.getData()
        }catch(error){
          alert('fail')
        }
      },1000),
      // 切换选中状态
      async taggleChecked(item,event){
        let isChecked = event.target.checked?1:0
        try{
          await this.$store.dispatch('taggleChecked',{skuId:item.skuId,isChecked:isChecked})
          this.getData()
        }catch(error){
          alert(error.message)
        }
      },
      // 点击全选
      async taggleAllChecked(e){
        if(this.$store.state.cart.cartList.length===0) return
        let ischecked = e.target.checked?1:0
        try{
          await this.$store.dispatch('taggleAllisChecked',ischecked)
          this.getData()
        }catch(error){
          alert(error.message)
        }
      },
      // 点击删除选中商品
      async deleteChecked(){
        try{
          await this.$store.dispatch('deleteAllChecked')
          this.getData()
        }catch(error){
          alert(error.message)
        }
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
            width:15%;
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
            width: 15%;

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
            width: 12%;

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