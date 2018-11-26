<template>
  <div class="me">
    <div>
      <van-nav-bar  title="会员中心" />
      <div class="top">
        <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg" class="top-img" />
      </div>
      <div class="login">
          <div><van-button type="warning" @click="toLogin">我要登录</van-button></div>
          <div><van-button type="primary" @click="toRegoster">我要注册</van-button></div>
      </div>
      <div>
        <van-cell-group>
          <van-cell title="会员卡" is-link />
          <van-cell title="地址管理" is-link  />
          <van-cell title="我的订单" is-link  />
          <van-cell title="会员权益" is-link />
          <van-cell title="联系我们" is-link  />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    toLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    toRegoster () {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>

<style scoped>
.top-img {
  width: 70px;
  height: 70px;
  border-radius: 50px;
}
.top {
  height: 5rem;
  text-align: center;
  padding-top: 2rem;
  background-color: #eea2ad;
}
.login {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
}
.login div {
  flex: 1;
  text-align: center;
}
</style>
