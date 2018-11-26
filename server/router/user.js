const Router = require('koa-router')
const ApiDao = require('../db/dao/apiDao.js')
const UserModel = require('../db/shcemas/user')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'user'
})

// 登陆
router.post('/login', async (ctx) => {
  console.log(ctx.request.body)
  let userName = ctx.request.body.userName
  let password = ctx.request.body.password

  if (userName === '' || !userName) {
    ctx.body = {
      msg: '用户名不能为空',
      code: 101
    }
    return false
  }

  if (password === '' || !password) {
    ctx.body = {
      msg: '密码不能为空',
      code: 102
    }
    return false
  }
  let User = new ApiDao.UserDao()
  await User.findOne({
    userName: userName
  }).then(async (result) => {
    console.log(result)
    if (result) {
      let user = new UserModel()
      await user.comparePassword(password, result.password).then((isMatch) => {
        console.log(isMatch)
        if (isMatch) {
          ctx.body = {
            code: 0,
            msg: '登陆成功',
            data: {
              token: result._id
            }
          }
        } else {
          ctx.body = {
            code: -1,
            msg: '用户名或者密码不正确'
          }
        }
      }).catch((err) => {
        console.log(err)
        ctx.body = {
          code: 500,
          msg: err
        }
      })
    } else {
      ctx.body = {
        msg: '用户不存在',
        code: 104
      }
      return false
    }
  }).catch((err) => {
    console.log(err)
    ctx.body = {
      code: 500,
      msg: err
    }
  })
})

// 注册
router.post('/register', async (ctx) => {
  let reqBody = ctx.request.body
  // 验证请求数据
  if (reqBody.userName === '' || !reqBody.userName) {
    ctx.body = {
      msg: '用户名不能为空',
      code: 101
    }
    return false
  } else if (reqBody.userName.length < 6) {
    ctx.body = {
      msg: '用户名长度不能小于6',
      code: 103
    }
    return false
  }
  if (reqBody.password === '' || !reqBody.password) {
    ctx.body = {
      msg: '密码不能为空',
      code: 102
    }
    return false
  } else if (reqBody.password.length < 6) {
    ctx.body = {
      msg: '密码长度不能小于6',
      code: 103
    }
    return false
  }
  // 判断是有已经注册
  // 存入数据库
  let User = new ApiDao.UserDao()
  await User.save(reqBody).then((result) => {
    ctx.body = {
      code: 0,
      msg: '注册成功',
      data: null
    }
  }).catch((err) => {
    ctx.body = {
      code: -1,
      msg: '注册失败',
      data: err
    }
  })
})

module.exports = router
