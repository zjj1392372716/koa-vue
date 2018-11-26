<template>
  <div class="toast_wrapper" v-if="show">
    <div class="toast_hing"></div>
    <div class="toast_box">
      <div class="Toast" style="opacity: 1;">
        <img v-if="isShowIcon" :src="imgSrc" alt="">
        <p>{{tip}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否展示
    show: {
      type: Boolean,
      default: false
    },
    // icon类型 success | fail | info
    iconType: {
      type: String,
      default: 'success'
    },
    // 是否显示icon
    isShowIcon: {
      type: Boolean,
      default: true
    },
    // 提示语
    tip: {
      type: String,
      default: '注册成功注'
    }
  },
  data () {
    return {
      // imgSrc: ''
    }
  },
  computed: {
    imgSrc () {
      let isShowIcon = this.isShowIcon
      let iconType = this.iconType
      let resultSrc = ''
      switch (iconType) {
        case 'success':
          resultSrc = 'http://i2.bvimg.com/667863/ef84bfcf26a0c301.png'
          break
        case 'fail':
          resultSrc = 'http://i2.bvimg.com/667863/553430ea137e2629.png'
          break
        case 'info':
          resultSrc = 'http://i2.bvimg.com/667863/8860ed0af4f824cc.png'
          break
      }
      if (!isShowIcon) {
        return ''
      }
      return resultSrc
    }
  }
}
</script>

<style scoped>
.toast_wrapper{
  width: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toast_hing{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}
.toast_box{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1010;
  display: flex;
  flex-direction: column ;
  align-items: center;
  justify-content: center;
}
.Toast{
  background: rgba(0,0,0,0.5);
  color: #fff;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 37%;
  border-radius: 20px;
  padding: 18px 0px;
}
.Toast img{
  width:50px;
  height: 50px;
}
.Toast p{
  width: 90%;
  font-size: 18px;
  margin-top: 14px;
  text-align: center;
}
</style>
