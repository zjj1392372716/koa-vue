const mongoose = require('mongoose')
const mongodbConfig = require('./config/index')
const configOptions = mongodbConfig.config

/**
 * 数据库连接配置信息
 */
function getMongoOptions () {
  let options = {
    useNewUrlParser: true,
    poolSize: 5, // 连接池中维护的连接数
    reconnectTries: Number.MAX_VALUE,
    keepAlive: 120
  }
  if (configOptions.user !== '' || configOptions.user) {
    options.user = configOptions.user
  }
  if (configOptions.pass !== '' || configOptions.pass) {
    options.pass = configOptions.pass
  }

  return options
}

/**
 * 拼接 uri
 */
function getMongoUri () {
  let mongoUri = 'mongodb://'
  let dbName = configOptions.db
  mongoUri += `${configOptions.host}:${configOptions.port}`
  mongoUri += `/${dbName}`

  return mongoUri
}

/**
 * 连接数据库
 */
exports.connect = function () {
  let uri = getMongoUri()
  let options = getMongoOptions()
  console.log(uri)
  console.log(options)
  mongoose.connect(uri, options)
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    // 增加数据库监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('@数据库断开～')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(uri, options)
      } else {
        throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
      }
    })

    mongoose.connection.on('error', (err) => {
      console.log('@数据库错误')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(uri, options)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
      }
    })

    // 链接打开
    mongoose.connection.once('open', () => {
      console.log('@MongoDB连接成功！')
      resolve(null)
    })
  })
}
