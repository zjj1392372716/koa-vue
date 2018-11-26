export default {
  method: 'post',
  // 基础url前缀
  // baseURL: 'https://www.easy-mock.com/mock/5be2d106033152564881d284/smileShop',
  baseURL: 'http://localhost:3000',
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json'
}
