<template>
  <div class="category">
    <van-nav-bar
      title="全部商品"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-row>
      <van-col span="6">
        <div id="leftNav">
          <ul>
            <li @click="selectCategory(index, item.ID)" :class="{categoryActice:categoryIndex==index}" v-for="(item , index) in category" :key="index">
              {{item.MALL_CATEGORY_NAME}}
            </li>
          </ul>
        </div>
      </van-col>
      <van-col span="18" class="right-content">
        <div class="tabCategorySub" ref="subTool">
          <van-tabs v-model="active"  @click="onClickCategorySub">
            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
          </van-tabs>
        </div>
        <div id="list-div">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
            >
              <div class="list-item"
                  @click="goGoodsInfo(item.ID)"
                  v-for="(item,index) in goodList"
                  :key="index"
                  >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div class="list-item-text-title">{{item.NAME}}</div><div class="list-item-text-money">￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import api from '@/http/api.js'
import {dealMoney} from '@/common/filter.js'
export default {
  data () {
    return {
      category: [], // 大类
      categorySub: [], // 小类
      categoryIndex: 0, // 大类当前索引
      active: 0, // 子类选中的索引
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完成
      categorySubId: '', // 选中的子类的id
      page: 1, // 页数
      goodList: [], // 商品列表
      isRefresh: false, // 下拉刷新
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"'
    }
  },
  filters: {
    moneyFilter (money) {
      return dealMoney(money)
    }
  },
  methods: {
    // 返回
    onClickLeft () {
      this.$router.go(-1)
    },
    // 查看商品详情
    goGoodsInfo (id) {
      this.$router.push({
        path: '/goodsInfo',
        query: { id: id }
      })
    },
    // 选择大类
    selectCategory (index, id) {
      console.log(index, id)
      this.categoryIndex = index
      this.active = 0
      this.page = 1
      this.finished = false
      this.goodList = []
      this._getCategorySub(id)
      this.categoryIndex = index
    },
    onClickCategorySub (index, title) {
      this.categorySubId = this.categorySub[index].ID
      this.goodList = []
      this.finished = false
      this.page = 1
      console.log('点击子类')
      this.onLoad()
    },
    // 下拉刷新方法
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        console.log('上啦刷新')
        this.onLoad()
      }, 500)
    },
    // 获取大类
    _getCategory () {
      let that = this
      api.getCategory().then((res) => {
        if (res.code === 0) {
          that.category = res.data
          that._getCategorySub(res.data[0].ID)
        } else {
          // ...
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 根据大类获取子类
    _getCategorySub (id) {
      console.log(id)
      let that = this
      api.getCategorySub({
        categoryId: id
      }).then((res) => {
        if (res.code === 0) {
          that.categorySub = res.data
          that.categorySubId = res.data[0].ID
          that.active = 0
        } else {
          // ...
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 计算高度
    _caculateHeight () {
      let winHeight = document.documentElement.clientHeight
      document.getElementById('leftNav').style.height = winHeight - 46 - 50 + 'px'
      let subToolHeight = this.$refs.subTool.offsetHeight
      document.getElementById('list-div').style.height = winHeight - 46 - 50 - subToolHeight + 'px'
    },
    // 加载
    onLoad () {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 300)
    },
    // 获取子类下的商品
    getGoodList () {
      console.log('--------')
      let that = this
      api.getGoodList({
        categorySubId: that.categorySubId,
        page: that.page
      }).then((res) => {
        if (res.code === 0 && res.data.length) {
          that.page++
          that.goodList = that.goodList.concat(res.data)
        } else {
          this.finished = true
        }
        that.loading = false
      })
    }
  },
  created () {
    this._getCategory()
  },
  mounted () {
    this._caculateHeight()
  }
}
</script>

<style scoped>
#leftNav{
  background-color: #F8F8F8;
}
#leftNav ul li {
  line-height: 2rem;
  padding: 0.3rem 0rem 0.3rem 0.5rem;
  font-size:0.7rem;
  text-align: left;
  color: #7B7B7B;
}
.categoryActice{
  background-color: #fff;
}
.tabCategorySub{
  padding-left: 0.2rem;
  box-sizing: border-box;
  background: #EFEFEF;
}
.van-tab span {
  display: block;
  color: #bfbcbc;
}
#list-div{
  overflow: scroll;
  background: #EFEFEF;
}
.list-item{
  display: flex;
  flex-direction: row;
  font-size:0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding:5px;
}
#list-div{
  overflow: scroll;
  padding: 0.1rem 0.2rem 0.2rem 0.2rem;
  box-sizing: border-box;
  background: #EFEFEF;
}
.list-item-img{
  flex:8;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.list-item-text{
  flex:16;
  margin-top:10px;
  margin-left:10px;
}
.list-item-text-title{
  font-size: 0.7rem;
  color: #555;
}
.list-item-text-money{
  color: #8a8585;
  margin-top: 0.4rem;
}
</style>
