const Router = require('koa-router')
const ApiDao = require('../db/dao/apiDao.js')
const fs = require('fs')
const path = require('path')
let router = new Router()

// 批量插入商品详情数据
router.get('/insertAllGoodsInfo', async (ctx) => {
  let url = path.resolve(__dirname, './data.json')
  fs.readFile(url, 'utf8', (err, data) => {
    if (err) {
      console.log('sss')
      return
    }
    data = JSON.parse(data)
    console.log(data)
    data.RECORDS.map((value, index) => {
      let CategoryObj = new ApiDao.CategoryClass()
      CategoryObj.save(value).then((result) => {
        console.log('插入成功')
      }).catch((err) => {
        console.log('插入失败:' + err)
      })
    })
  })

  ctx.body = '开始导入数据'
})

// 批量插入父勒数据
router.get('/insertCategory', async (ctx) => {
  let url = path.resolve(__dirname, '../data_json/category.json')
  fs.readFile(url, 'utf8', (err, data) => {
    if (err) {
      console.log('sss')
      return
    }
    data = JSON.parse(data)
    data.RECORDS.map((value, index) => {
      console.log(value)
      let CategoryClass = new ApiDao.CategoryClass()
      CategoryClass.save(value).then((result) => {
        console.log('插入成功')
      }).catch((err) => {
        console.log('插入失败:' + err)
      })
    })
  })

  ctx.body = '开始导入数据'
})

// 批量插入子类数据
router.get('/insertCategorySub', async (ctx) => {
  let url = path.resolve(__dirname, '../data_json/category_sub.json')
  fs.readFile(url, 'utf8', (err, data) => {
    if (err) {
      console.log('sss')
      return
    }
    data = JSON.parse(data)
    data.RECORDS.map((value, index) => {
      console.log(value)
      let CategorySub = new ApiDao.CategorySubClass()
      CategorySub.save(value).then((result) => {
        console.log('插入成功')
      }).catch((err) => {
        console.log('插入失败:' + err)
      })
    })
  })

  ctx.body = '开始导入数据'
})

// 获取商品详情
router.post('/getGoodsInfo', async (ctx) => {
  let goodID = ctx.request.body.goodID
  console.log(goodID)
  let GoodShop = new ApiDao.GoodShop()
  await GoodShop.findOne({
    ID: goodID
  }).then(async (result) => {
    console.log(result)
    if (result) {
      ctx.body = {
        code: 0,
        msg: 'ok',
        data: result
      }
    }
  }).catch((err) => {
    console.log(err)
    ctx.body = {
      code: -1,
      msg: err,
      data: null
    }
  })
})

// 获取大类
router.get('/getCategory', async (ctx) => {
  let Category = new ApiDao.CategoryClass()
  await Category.findAll({}).then((result) => {
    if (result) {
      ctx.body = {
        code: 0,
        msg: 'ok',
        data: result
      }
    }
  }).catch((err) => {
    console.log(err)
    ctx.body = {
      code: -1,
      msg: err,
      data: null
    }
  })
})

// 获取子类
router.post('/getCategorySub', async (ctx) => {
  let cateoryId = ctx.request.body.categoryId
  let CategorySub = new ApiDao.CategorySubClass()
  await CategorySub.findAll({
    MALL_CATEGORY_ID: cateoryId
  }).then((result) => {
    if (result) {
      ctx.body = {
        code: 0,
        msg: 'ok',
        data: result
      }
    }
  }).catch((err) => {
    console.log(err)
    ctx.body = {
      code: -1,
      msg: err,
      data: null
    }
  })
})

// 获取子类下商品列表
router.post('/getGoodList', async (ctx) => {
  let categorySubId = ctx.request.body.categorySubId // 子类id
  let page = ctx.request.body.page || 0 // 当前页数
  let num = 10 // 每页显示数量
  let start = (page - 1) * num // 开始位置 1+
  let GoodShop = new ApiDao.GoodShop()
  await GoodShop.findAllByPage({
    SUB_ID: categorySubId
  }, start, num).then((result) => {
    if (result) {
      ctx.body = {
        code: 0,
        msg: 'ok',
        data: result
      }
    }
  }).catch((err) => {
    console.log(err)
    ctx.body = {
      code: -1,
      msg: err,
      data: null
    }
  })
})
module.exports = router
