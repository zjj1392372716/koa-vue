<template>
  <div class="register_wrapper">
    <!-- nav bar -->
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- nav bar -->

    <div class="main_box">
      <h3 class="title">Sign Up</h3>
      <div class="avator">
        <img src="http://img3.imgtn.bdimg.com/it/u=850016154,2966264409&fm=26&gp=0.jpg" alt="">
      </div>
      <div class="form">
        <div class="form-group">
          <input type="text" name="username" placeholder="username" v-model="userName" />
        </div>
        <div class="form-group">
          <input type="text" name="password" placeholder="password" v-model="password" />
        </div>
        <div class="fomr-group">
          <button type="button" class="toReg" @click="toReg">立即注册</button>
        </div>
      </div>
      <h4 class="endTitle">Already have an account? <span class="toSignIn" @click="toLogin">Sign In</span></h4>
    </div>
  </div>
</template>

<script>
import api from '@/http/api.js'
export default {
  data () {
    return {
      userName: '', // 用户名
      password: '' // 密码
    }
  },
  methods: {
    // 返回
    onClickLeft () {
      this.$router.go(-1)
    },
    // 注册操作
    toReg () {
      // [1] 前端校验
      this._checkUserInfo() && this._registerUser()
    },
    // 用户发送请求注册
    _registerUser () {
      this.$loading.show('注册中..')
      api.userRegister({
        userName: this.userName,
        password: this.password
      }).then((res) => {
        this.$loading.hide()
        if (res.code === 0) {
          this.$toast.show('注册成功！', 'ok')
          let that = this
          setTimeout(() => {
            that.$router.push('/login')
          }, 1000)
        } else {
          this.$toast.show(res.msg, 'fail')
        }
      })
    },
    // 校验用户注册信息
    _checkUserInfo () {
      let username = this.userName + ''
      let password = this.password + ''
      console.log(username.length)
      console.log(password.length)
      if (username.length < 6) {
        this.$toast.show('用户名不能低于6位数', 'info')
        return false
      }
      if (password.length < 6) {
        this.$toast.show('密码不能低于6位数', 'info')
        return false
      }
      return true
    },
    // 登陆操作
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.register_wrapper{
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  background: linear-gradient(to bottom, #5ee7df 0%,#b490ca 100%);
}
.register_wrapper .main_box{
  margin: 2rem auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register_wrapper .main_box .title{
  color: #fff;
  font-size: 1.0rem;
}
.register_wrapper .main_box .avator{
  width: 5rem;
  height: 5rem;
  border: 0.3rem solid #ddd;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 2rem;
}
.register_wrapper .main_box .avator img{
  width: 100%;
  height: 100%;
}
.register_wrapper .main_box .form{
  width: 100%;
  text-align: center;
}
.register_wrapper .main_box .form input{
  border-radius: 1.2rem;
  border: none;
  outline: none;
  width: 80%;
  margin-top: 0.9rem;
  padding: 0.5rem 0.4rem;
  text-align: center;
  color: #f58f98;
  font-size: 0.9rem;
}
.register_wrapper .main_box .form .toReg{
  border: none;
  outline: none;
  width: 80%;
  background: #f58f98;
  color: #fff;
  padding: 0.5rem 0.4rem;
  border-radius: 1.2rem;
  margin-top: 0.9rem;
  font-size: 0.8rem;
  cursor: pointer;
  box-shadow:0px 0px 5px #E65AA4;
}
.endTitle{
  color: #fff;
  font-size: 0.7rem;
  margin-top: 6rem;
}
.endTitle .toSignIn{
  color: #5ee7df;
}
</style>
