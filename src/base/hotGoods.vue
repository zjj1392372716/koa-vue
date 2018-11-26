<template>
  <div class="goods-info" @click="showInfo()">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import { dealMoney } from '../common/filter.js'
export default {
  props: ['goodsImage', 'goodsName', 'goodsPrice', 'goodsId'],
  filters: {
    moneyFilter (money) {
      return dealMoney(money)
    }
  },
  methods: {
    showInfo () {
      let id = this.goodsId
      this.$router.push({
        path: '/goodsInfo',
        query: { id: id }
      })
    }
  }
}
</script>

<style scoped>
.goods-name{
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
}
</style>
