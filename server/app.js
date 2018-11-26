var Koa = require('koa')
const app = new Koa()
const { connect } = require('./db/dbInit.js')
// const ApiDao = require('./db/dao/apiDao.js')
const Router = require('koa-router')
const Json = require('koa-json') // ctx返回的数据为json对象
const BodyParser = require('koa-bodyparser') // 请求体
const cors = require('koa-cors') // 解决跨域问题

// 引入路由模块
var index = require('./router/index.js')
var users = require('./router/user.js')
var goods = require('./router/goods.js')
app.use(Json())
app.use(BodyParser())
app.use(cors())

;(() => {
  // 连接数据库
  connect().then(() => {
    console.log('数据库连接成功～')
  }).catch((err) => {
    console.log('数据库连接失败～' + err)
  })
})()

// 装载所有子路由
let router = new Router()
router.use('/user', users.routes())
router.use('/index', index.routes())
router.use('/goods', goods.routes())
// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('server is running at port 3000')
})
