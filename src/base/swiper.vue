<template>
  <div class="swiper-box">

    <!-- swiper -->
    <swiper :options="swiperOption" class="swiper_com">
      <!-- slides -->
      <swiper-slide class="swiper-slide" v-for="(item,index) in slides" :key="index">
        <img :src="item.image" alt="">
      </swiper-slide>
      <!-- slides -->
    </swiper>
    <!-- swiper -->

    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- Optional controls -->

  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      slides: [], // 轮播图
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  components: {
    swiper, swiperSlide
  },
  created () {
    // 获取首页数据
    axios({
      url: 'https://www.easy-mock.com/mock/5be2d106033152564881d284/smileShop/index',
      method: 'get'
    }).then((res) => {
      this.category = res.data.data.category
      this.advertesPicture = res.data.data.advertesPicture
      this.slides = res.data.data.slides
      this.recommend = res.data.data.recommend
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.swiper-box{
  position: relative;
}
.swiper_com{
  width: 100%;
  text-align: center;
}
.swiper-slide{
  width: 100%;
  height: 145px;
}
.swiper-slide img{
  width: 100%;
}
.swiper-pagination{
  position: absolute;
  bottom: 4px;
  right: 10px;
}
.swiper-pagination span{
  display: inline-block;
  margin: 0px 2px;
}
</style>
