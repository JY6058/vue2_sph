<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{orderInfo.orderId}}</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{orderInfo.totalFee}}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <span class="btn" @click="open">立即支付</span>
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
  export default {
    name: 'Pay',
    data(){
      return {
        orderInfo:{},
        // 定时器
        timer:null,
        code :''
      }
    },
    mounted(){
      this.payInfo()
    },
    methods:{
      async payInfo(){
        // console.log(this.$route.query.orderId)
        let res = await this.$API.getPayInfo(this.$route.query.orderId)
        if(res.data.code===200){
          this.orderInfo = res.data.data
        }
      },
      // 点击支付的弹出框
      async open(){
        let url = await this.qrcodeUrl()
        // console.log(url)
        this.$alert(`<img src="${url}" />`, '请微信扫码支付', {
          // 居中
          center:true,
          // 显示HTML片段
          dangerouslyUseHTMLString: true,
          // 右上角的X关闭 
          showClose:false,
          // 显示取消按钮
          showCancelButton:true,
          // 取消按钮文本,
          cancelButtonText:'支付遇见问题',
          // 确定按钮
          showConfirmButton:true,
          // 确定按钮文本
          confirmButtonText:'已完成支付',
          // 关闭前的回调
          beforeClose:(action,instance,done)=>{
            // console.log(action)
            if(action=='cancel'){
              alert('取消了支付')
              clearInterval(this.timer)
              this.timer = null
              done()
            }else{
              // if(this.code===200){
                clearInterval(this.timer)
                this.timer = null
                done()
                // 跳转页面
                this.$router.push('/paysuccess')
              // }
            }
          }
        }).then(res=>{
          console.log(res)
        }).catch((error)=>{
          console.log(error)
        })
        // 开启定时器
        if(!this.timer){
          this.timer = setInterval(this.getOrderStatus,1000)
        }
      },
      // 生成二维码的url
      async qrcodeUrl(){
        try{
          let res = await QRCode.toDataURL(this.orderInfo.codeUrl)
          return res
        }catch(error){
          return Promise.reject(new Error(error.message))
        }
      },
      // 查询订单支付状态
      async getOrderStatus(){
        let res = await this.$API.payStatus(this.$route.query.orderId)
        console.log(res.data)
        this.code = res.data.code
        // 支付成功
        if(res.data.code===200){
          clearInterval(this.timer)
          this.timer = null
          this.$router.push('/paysuccess')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>