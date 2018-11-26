import {
  get,
  post
} from './http'
import axios from 'axios'

const api = (function () {
  // 首页
  const index = function () {
    let url = ' https://www.easy-mock.com/mock/5be2d106033152564881d284/smileShop/index'
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: {}
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  // 用户登陆
  const userLogin = function (data) {
    let url = '/user/login'
    return post(url, data)
  }
  // 用户注册
  const userRegister = function (data) {
    let url = '/user/register'
    return post(url, data)
  }
  // 获取商品详情
  const getGoodInfo = function (data) {
    let url = '/goods/getGoodsInfo'
    return post(url, data)
  }
  // 获取大类
  const getCategory = function (params) {
    let url = '/goods/getCategory'
    return get(url, params)
  }
  // 获取小类
  const getCategorySub = function (data) {
    let url = '/goods/getCategorySub'
    return post(url, data)
  }
  const getGoodList = function (data) {
    let url = '/goods/getGoodList'
    return post(url, data)
  }
  return {
    index,
    userLogin,
    userRegister,
    getGoodInfo,
    getCategory,
    getCategorySub,
    getGoodList
  }
})()

export default api
