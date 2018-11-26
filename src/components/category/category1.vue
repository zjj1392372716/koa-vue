<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表" />
        </div>

        <div>
          <van-row>
              <van-col span="6">
                  <div id="leftNav">
                       <ul>
                           <li @click="clickCategory(index,item.ID)" :class="{categoryActice:categoryIndex==index}" v-for="(item , index) in category" :key="index">
                               {{item.MALL_CATEGORY_NAME}}
                           </li>
                       </ul>
                  </div>
                 
              </van-col>
              <van-col span="18">

                  <div class="tabCategorySub">
                      <van-tabs v-model="active" @click="onClickCategorySub">
                          <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                          </van-tab>
                      </van-tabs>
                  </div>
                  
                <div id="list-div">
                    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" @load="onLoad">
                            <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                                <div class="list-item-img">
                                    <img :src="item.IMAGE1" 
                                    width="100%"
                                    :onerror="errorImg"                                    
                                     />
                                    
                                    
                                   
                                </div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>                                    
                                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>                                    
                                 </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </div>
              </van-col>
          </van-row>  
        </div>

    </div>
</template>

<script>
import api from '@/http/api.js'
import { dealMoney } from "@/common/filter.js";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [], //小类类别
      active: 0, //激活标签的值
      loading: false,
      finished: false, //上拉加载是否有数据
      page: 1, //商品列表的页数
      goodList: [], //商品列表信息
      categorySubId: "", //商品子类ID
      isRefresh: false, //下拉刷新
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"'
    };
  },
  filters: {
    moneyFilter(money) {
      return dealMoney(money);
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height =
      winHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height =
      winHeight - 90 - 50 + "px";
  },
  methods: {
    getCategory() {
      let that = this
      api.getCategory().then((res) => {
        if (res.code === 0) {
          this.category = res.data
          this.getCategorySubByCategoryID(this.category[0].ID);
        } else {
          // ...
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryID(categoryId);
    },
    //根据大类ID读取小类类别列表
    getCategorySubByCategoryID(categoryId) {
      let that = this
      api.getCategorySub({
        categoryId: categoryId
      }).then((res) => {
        if (res.code == 0 && res.data.length > 0) {
          this.categorySub = res.data
          this.active = 0
          this.categorySubId = this.categorySub[0].ID
          this.onLoad()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //上拉加载方法
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    //下拉刷新方法
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    getGoodList() {
      let that = this
      api.getGoodList({
        categorySubId: that.categorySubId,
        page: that.page
      }).then((res) => {
        if (res.code === 0 && res.data.length > 0) {
          that.page++;
          that.goodList = that.goodList.concat(res.data);
        } else {
          that.finished = true
        }
        that.loading = false
      })
    },
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      console.log("categorySubId:" + this.categorySubId);
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    //跳转到商品详细页
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    }
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActice {
  background-color: #fff;
}

.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
