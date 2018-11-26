<template>
  <div class="register_wrapper">
    <!-- nav bar -->
    <van-nav-bar
      title="登陆"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- nav bar -->
    <!-- main content -->
    <div class="main_box">
      <h3 class="title">Sign In</h3>
      <div class="avator">
        <img src="http://img3.imgtn.bdimg.com/it/u=850016154,2966264409&fm=26&gp=0.jpg" alt="">
      </div>
      <div class="form">
        <div class="form-group">
          <input type="text" name="username" v-model="username" placeholder="username" />
        </div>
        <div class="form-group">
          <input type="text" name="password" v-model="password" placeholder="password" />
        </div>
        <div class="fomr-group">
          <button type="button" class="toReg" @click="userLogin">立即登陆</button>
        </div>
      </div>
      <h4 class="endTitle">No account yet. <span class="toSignIn" @click="toRegister">Sign Up</span> </h4>
    </div>
    <!-- main content -->
  </div>
</template>

<script>

import api from '@/http/api.js'
export default {
  data () {
    return {
      dialogisShow: false, // 弹框是否显示
      iconType: 'fail',
      iconimg: './componentImages/ok.png',
      title: '我是标题',
      username: '', // 用户名
      password: '' // 密码
    }
  },
  created () {

  },
  methods: {
    // 返回
    onClickLeft () {
      this.$router.go(-1)
    },
    // 注册操作
    toRegister () {
      this.$router.push('/register')
    },
    closeDialog () {
      this.dialogisShow = false
    },
    // 用户登陆
    userLogin () {
      console.log('----')
      // 登陆校验 + 登陆
      // this.$toast.show('sss', 'success')
      this._checkLogin() && this._userLogin()
    },
    // 校验登陆
    _checkLogin () {
      let username = this.userName + ''
      let password = this.password + ''
      if (username.length <= 0) {
        this.$toast.show('请输入用户名', 'info')
        return false
      }
      if (password.length < 6) {
        this.$toast.show('请输入密码', 'info')
        return false
      }
      return true
    },
    // 登陆请求发送
    _userLogin () {
      this.$loading.show('登陆中..')
      api.userLogin({
        userName: this.username,
        password: this.password
      }).then((res) => {
        this.$loading.hide()
        console.log(res)
        if (res.code === 0) {
          localStorage.token = res.data.token
          this.$toast.show('登陆成功', 'ok')
          // this.$router.push('/')
        } else {
          this.$toast.show(res.msg, 'fail')
        }
      })
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
