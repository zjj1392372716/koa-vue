<template>
  <div class="main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  created () {
    this.changeTabBarActive()
  },
  updated () {
    this.changeTabBarActive()
  },
  methods: {
    changeTabBarActive () {
      let routerPath = this.$route.path
      switch (routerPath) {
        case '/Main/':
          this.active = 0
          break
        case '/Category':
          this.active = 1
          break
        case '/cart':
          this.active = 2
          break
        case '/me':
          this.active = 3
          break
      }
    },
    changeTabbar (index) {
      console.log(index)
      switch (index) {
        case 0:
          this.$router.push({name: 'Home'})
          break
        case 1:
          this.$router.push({name: 'Category'})
          break
        case 2:
          this.$router.push({name: 'cart'})
          break
        case 3:
          this.$router.push({name: 'Me'})
          break
      }
    }
  }
}
</script>

<style>

</style>
