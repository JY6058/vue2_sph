<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" @change="validate(rules.phone,phone)">
        <span class="error-msg" v-show="rules.phone.show">{{rules.phone.msg}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" @change="validate(rules.code,code)">
        <button @click="getCode">获取验证码</button>
        <span class="error-msg" v-show="rules.code.show">{{rules.code.msg}}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password1" @change="validate(rules.password1,password1)">
        <span class="error-msg" v-show="rules.password1.show">{{rules.password1.msg}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password2" @change="validate(rules.password2,password2)">
        <span class="error-msg" v-show="rules.password2.show">{{rules.password2.msg}}</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isCheched">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-show="text">{{text}}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data(){
      return {
        phone:'',
        code:'',
        password1:'',
        password2:'',
        // 提交时检验的提示信息
        text:'',
        // 勾选同意协议
        isCheched:false,
        rules:{
          phone:{
            rule:/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/,
            // rule:/^\d{11}$/,
            msg:'手机号为11位数字！',
            show:false
          },
          code:{
            rule:/^\d{6}$/,
            msg:'验证码为6位数字！',
            show:false
          },
          password1:{
            // rule:/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
            // msg:'密码由字母和数字组成，不少于6位！',
            rule:/^[a-zA-Z0-9]{6,}$/,
            msg:'密码至少为6位字母或数字！',
            show:false
          },
          password2:{
            // rule:/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
            // msg:'密码由字母和数字组成，不少于6位！',
            rule:/^[a-zA-Z0-9]{6,}$/,
            msg:'密码至少为6位字母或数字！',
            show:false
          }
        }
      }
    },
    methods:{
      // 校验函数
      validate(obj,str){
        if(obj.rule.test(str)){
          obj.show = false
          return true
        }else{
          obj.show = true
          return false
        }
      },
      // 获取验证码
      async getCode(){
        if(this.validate(this.rules.phone,this.phone)){
          // console.log('ok')
          await this.$store.dispatch('reqCode',this.phone)
          this.code = this.$store.state.user.code
        }else{
          console.log('fail')
        }
      },
      // 注册
      async register(){
        if(!this.validate(this.rules.phone,this.phone)){
          return
        }else if(!this.validate(this.rules.code,this.code)){
          return
        }else if(!this.validate(this.rules.password1,this.password1)){
          return
        }else if(!this.validate(this.rules.password2,this.password2)){
          return
        }else if(this.password1!==this.password2){
          this.text = '两次输入密码不相等！'
          return
        }else if(!this.isCheched){
          this.text = '请勾选同意！'
        }else{
          this.text = ''
          // console.log('ok')
          try{
            await this.$store.dispatch('registerUser',{phone:this.phone,password:this.password1,code:this.code})
            this.$router.push('/login')
          }catch(error){
            alert(error.message)
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>