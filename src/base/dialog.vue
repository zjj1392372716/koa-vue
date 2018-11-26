<template>
  <div class="dialog_wrapper" v-if="isShow">
    <div class="dialog-cover" v-if="isShow"></div>
    <transition name="drop">
      <div class="dialog-content" v-if="isShow">
        <div class="dialog_head">{{dialogTitle}}</div>
        <div class="dialog_main">
          <!--弹窗的内容-->
          <slot name="main"></slot>
          <!--弹窗的内容-->
        </div>
        <!--弹窗关闭按钮-->
        <div class="foot_close">
          <div class="close_img" @click="closeMyself">
            <img src="./componentImages/fail.png" alt="">
          </div>
        </div>
        <!--弹窗关闭按钮-->
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    // 是否显示
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    // 宽度
    widNum: {
      type: Number,
      default: 86.5
    },
    dialogTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all 0.3s ease;
}
.drop-leave-active {
  transition: all 0.3s ease;
}
.drop-enter {
  opacity: 1;
}
.drop-leave-active {
  opacity: 0;
}
.dialog_wrapper{
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: rgba(0,0,0, 0.7);
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content{
  width: 70%;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 300;
}
.dialog_head {
  background: pink;
  color: #fff;
  width: 86.5%;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 16px;
}
 .dialog_main {
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 86.5%;
  padding: 22px 0 44px 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.foot_close {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: pink;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: -25px;
}
.close_img {
  width: 42px;
  height: 42px;
  margin-top:4px;
}
.close_img img{
  width: 100%;
  height: 100%;
}
</style>
