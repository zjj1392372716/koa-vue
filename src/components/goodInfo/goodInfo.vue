<template>
  <div class="goodInfo">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topimage-div">
      <img :src="goodsInfoObj.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{goodsInfoObj.NAME}} </div>
    <div class="goods-price">价格 ：￥{{goodsInfoObj.PRESENT_PRICE | moneyFilter}}元</div>
    <div class="main-content">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfoObj.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">
          评论制作中
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/http/api.js'
import {dealMoney} from '@/common/filter.js'
export default {
  data () {
    return {
      goodId: '',
      goodsInfoObj: null
    }
  },
  filters: {
    moneyFilter (money) {
      return dealMoney(money)
    }
  },
  created () {
    this.goodId = this.$route.query.id
    this._getGoodsInfo(this.goodId)
  },
  methods: {
    _getGoodsInfo (id) {
      let that = this
      api.getGoodInfo({
        goodID: id
      }).then((res) => {
        if (res.code === 0) {
          that.goodsInfoObj = res.data
        } else {
          console.log(res)
        }
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    addGoodsToCart () {
    }
  }
}
</script>

<style scoped>
.goods-name{
  background-color: #fff;
  font-size: 0.8rem;
  color: #999;
  padding-left: 0.6rem;
}
.goods-price{
  background-color: #fff;
  color: #dcd4d4;
  font-size: 0.6rem;
  margin-bottom: 0.5rem;
  padding-left: 0.6rem;
}
.detail {
  font-size:0px;
}
.main-content{
  padding-bottom: 60px;
}
.goods-bottom{
  position:fixed;
  bottom:0px;
  left:0px;
  background-color: #FFF;
  width:100%;
  display: flex;
  flex-direction: row;
  flex-flow:nowrap;
}
.goods-bottom > div {
  flex:1;
  padding:5px;
}
</style>
