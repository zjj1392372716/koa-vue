<template>
  <div class="wrapper">
    <!-- 商品楼层 -->
    <div class="floor_wrapper">
      <div class="recommend_title">{{floorTitle}}</div>
      <div class="floor_body">
        <!-- 顶层 -->
        <div class="floor_normal" v-if="isShowFloorTop">
          <div class="floor_normal_left" @click="showInfo(floorData1.goodsId)">
            <img :src="floorData1.image" alt="">
          </div>
          <div class="floor_normal_right">
            <div class="floot_item" @click="showInfo(floorData2.goodsId)">
              <img :src="floorData2.image" alt="">
            </div>
            <div class="floot_item" @click="showInfo(floorData3.goodsId)">
              <img :src="floorData3.image" alt="">
            </div>
          </div>
        </div>
        <!-- 顶层 -->

        <!-- 左右楼层 -->
        <div class="floor_item_box">
          <div class="floor_item" v-for="(item, index) in floorlist" :key="index" @click="showInfo(item.goodsId)">
            <img :src="item.image" alt="">
          </div>
        </div>
        <!-- 左右楼层 -->
      </div>
    </div>
    <!-- 商品楼层 -->
  </div>
</template>

<script>
export default {
  props: {
    floors: {
      type: Array
    },
    isShowFloorTop: {
      type: Boolean,
      default: false
    },
    floorTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      floorData1: {},
      floorData2: {},
      floorData3: {},
      floorlist: []
    }
  },
  methods: {
    showInfo (id) {
      this.$router.push({
        path: '/goodsInfo',
        query: { id: id }
      })
    }
  },
  watch: {
    floors: function (val) {
      if (this.isShowFloorTop) {
        this.floorData1 = this.floors[0]
        this.floorData2 = this.floors[1]
        this.floorData3 = this.floors[2]
        this.floorlist = this.floors.slice(3)
      } else {
        this.floorlist = this.floors
      }
    }
  }
}
</script>

<style scoped>
.recommend_title{
  font-size: 0.8rem;
  color: #f1b4ba;
  padding: 0.4rem 0.6rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
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
</style>
