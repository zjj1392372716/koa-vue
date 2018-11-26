<template>
  <div class="home_wrapper">
    <!-- 顶部搜索 -->
    <div class="search_bar">
      <van-row>
        <van-col class="position" span="4">
          <img src="../../assets/images/position.png" alt="">
          <span>天津</span>
        </van-col>
        <van-col class="input_wrapper" span="16">
          <input type="text" name="search_input">
        </van-col>
        <van-col class="search_btn_wrapper" span="4">
          <span class="search_btn">搜索</span>
        </van-col>
      </van-row>
    </div>
    <!-- 顶部搜索 -->

    <!-- 轮播图 -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in slides" :key="index">
          <img v-lazy="item.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播图 -->

    <!-- 菜单区 -->
    <div class="nav_tabbar">
      <div class="nav_tabbar_ping">
        <div class="nav_tabbar_item"  v-for="(cate,index) in category" :key="index">
          <img v-lazy="cate.image" width="80%">
          <span class="item_name">{{cate.mallCategoryName}}</span>
        </div>
      </div>
    </div>
    <!-- 菜单区 -->

    <!-- 弹幕条 -->
    <div class="gray_barrage">
      <img v-lazy="advertesPicture.PICTURE_ADDRESS" alt="">
    </div>
    <!-- 弹幕条 -->

    <!-- 推荐区 -->
    <div class="recommend_wrapper">
      <div class="recommend_title">商品推荐</div>
      <div class="recommend_body">
        <swiper :options="swiperOption">
          <swiper-slide class="swiper-slide" v-for="(item, index) in recommend" :key="index">
            <div class="recommend_item" @click="toShowInfo(item.goodsId)">
              <img :src="item.image" alt="">
              <div class="goods_name">{{item.goodsName}}</div>
              <div class="goods_price">
                <span class="goods_price_old">¥{{item.mallPrice | filterMoney}}元</span>
                <span class="goods_price_new">¥{{item.price | filterMoney}}元</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 推荐区 -->
    <floor-component :floors="floor1" :isShowFloorTop="true" :floorTitle="floorName1"></floor-component>
    <floor-component :floors="floor2" :isShowFloorTop="true" :floorTitle="floorName2"></floor-component>
    <floor-component :floors="floor3" :isShowFloorTop="true" :floorTitle="floorName3"></floor-component>

    <!-- 热卖 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
      <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item , index) in hotGoods" :key="index" style="padding: 0px;">
              <goods-info class="hotgoodsitem" :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price">

              </goods-info>
            </van-col>
          </van-row>
        </van-list>
        <div class="bottom">到底了～</div>
      </div>
    </div>
    <!-- 热卖 -->
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '@/base/floorComponent'
import { dealMoney } from '../../common/filter.js'
import goodsInfo from '../../base/hotGoods'
import api from '@/http/api.js'
export default {
  data () {
    return {
      slides: [], // 轮播图
      category: [], // 菜单bar
      advertesPicture: '', // 弹幕广告条
      recommend: [], // 推荐区域
      swiperOption: {
        slidesPerView: 3
      }, // swiper配置信息
      floor1: [],
      floor2: [],
      floor3: [],
      floor0_1: {},
      floor0_2: {},
      floor0_3: {},
      floorName: [],
      floorName1: '',
      floorName2: '',
      floorName3: '',
      hotGoods: ''
    }
  },
  components: {
    swiper, swiperSlide, floorComponent, goodsInfo
  },
  filters: {
    filterMoney: function (value) {
      return dealMoney(value)
    }
  },
  methods: {
    toShowInfo (id) {
      console.log(id)
      this.$router.push({
        path: '/goodsInfo',
        query: { id: id }
      })
    }
  },
  created () {
    // 获取首页数据
    api.index().then((response) => {
      response = response.data
      if (response.code === 0) {
        let data = response.data
        this.category = data.category
        this.advertesPicture = data.advertesPicture
        this.slides = data.slides
        this.recommend = data.recommend
        this.floor1 = data.floor1
        this.floor2 = data.floor2
        this.floor3 = data.floor3
        this.floor0_1 = data.floor1[0]
        this.floor0_2 = data.floor1[1]
        this.floor0_3 = data.floor1[2]
        this.floorName = data.floorName
        this.floorName1 = data.floorName['floor1']
        this.floorName2 = data.floorName['floor2']
        this.floorName3 = data.floorName['floor3']
        this.hotGoods = data.hotGoods
      }
    })
  }
}
</script>

<style scoped>
.home_wrapper{
  width: 100%;
  height: auto;
}
.search_bar {
  width: 100%;
  background: #f58f98;
  color: #fff;
  padding: 0.5rem 0rem;
}
.position {
  display: flex;
  flex-direction: row;
}
.position img{
  width: 1.6rem;
  height: 1.6rem;
}
.position span{
  line-height: 1.6rem;
  font-size: 0.7rem;
}
.input_wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}
.input_wrapper input{
  width: 98%;
  border-radius: 1.4rem;
  background: #f1b4ba;
  outline: none;
  border: none;
  text-indent: 0.2rem;
  font-size: 0.7rem;
  height: 1.6rem;
}
.search_btn_wrapper{
  display: flex;
  height: 1.7rem;
  justify-content: center;
  align-items: center;
}

.search_btn_wrapper .search_btn{
  display: inline-block;
  font-size: 0.9rem;
  height: 1.6rem;
  line-height: 1.6rem;
}

.swiper-area{
  width:100%;
  max-height:9rem;
  overflow: hidden;
  clear:both;
}
.nav_tabbar{
  box-sizing: border-box;
  width: 100%;
  padding: 0.2rem;
  background: #efefee;
  display: flex;
  flex-grow: nowrap;
}
.nav_tabbar_ping{
  border-radius: 0.3rem;
  background: #fff;
  display: flex;
  flex-grow: nowrap;
  padding: 0.2rem 0.3rem;
}
.nav_tabbar_item{
  background: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item_name{
  font-size: 0.7rem;
  color: #281f1d;
  margin-top: 0.2rem;
}
.swiper-slide{
  border-right: 1px solid #f0f0f0;
}
.gray_barrage{
  width: 100%;
  padding: 0.2rem 0.1rem;
  background: #f0f0f0;
}
.gray_barrage img{
  width: 100%;
}
.recommend_wrapper{
  width: 100%;
  background: #fff;
}
.recommend_title{
  font-size: 0.8rem;
  color: #f1b4ba;
  padding: 0.4rem 0.6rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
}
.recommend_body{
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
}

.recommend_body .recommend_item{
  width: 99%;
  height: 10rem;
  box-sizing: border-box;
  border-right: 1px solid #f0f0f0;
  font-size: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 0.3rem;
}

.recommend_body .recommend_item:nth-last-child(1) {
  border-right: none;
}
.recommend_item img{
  width: 90%;
}

.recommend_item .goods_price{
  display: flex;
  width: 99%;
}
.goods_price span{
  flex: 1;
}
.goods_price span.goods_price_old{
  color: #74787c;
  text-decoration: line-through;
  text-align: right;
  font-size: 0.5rem;
}
.goods_price span.goods_price_new{
  color: #f26522;
  text-indent: 0.2rem;
  font-size: 0.5rem;
}
.floor_wrapper{
  width: 100%;
}
.floor_wrapper .floor_body{
  width: 100%;
  box-sizing: border-box;
}
.floor_body .floor_normal{
  width: 100%;
  display: flex;
}
.floor_body .floor_normal .floor_normal_left{
  border-bottom: 1px solid #f0f0f0;
}
.floor_body .floor_normal .floor_normal_left, .floor_body .floor_normal .floor_normal_right{
  flex: 0 0 50%;
  box-sizing: border-box;
}
.floor_body .floor_normal .floor_normal_left img, .floor_body .floor_normal .floor_normal_right img{
  width: 100%;
}
.floor_body .floor_normal .floor_normal_left{
  border-right: 1px solid #f0f0f0;
}
.floor_body .floor_normal .floot_item{
  border-bottom: 1px solid #f0f0f0;
}
.floor_item_box{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.floor_item_box .floor_item{
  box-sizing: border-box;
  width: 50%;
  flex: 0 0 50%;
  border-bottom: 1px solid #f0f0f0;
}
.floor_item_box .floor_item img{
  width: 100%;
}
.floor_item_box .floor_item:nth-of-type(odd) {
  border-right: 1px solid #f0f0f0;
}
.hot-area{
  text-align: center;
  font-size:14px;
  height: 1.8rem;
  line-height:1.8rem;
}
.hot-goods{
  height: auto;
  overflow: hidden;
  background-color: #fff;
}
.hotgoodsitem{
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  height: 14rem;
}
.hotgoodsitem:nth-of-type(even) {
  border-right: none;
}
.bottom{
  width: 100%;
  text-align: center;
  padding: 0.6rem 0px;
  color: #555;
  clear: both;
}
.hot-title{
  width: 100%;
  background: #9d9087;
  color: #fff;
}
</style>
