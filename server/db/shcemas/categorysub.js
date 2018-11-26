const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 子类
const categorySubSchema = new Schema({
  ID: {
    unique: true,
    type: String
  },
  MALL_CATEGORY_ID: {
    type: String
  },
  MALL_SUB_NAME: {
    type: String
  },
  COMMENTS: {
    type: String
  },
  SORT: {
    type: Number
  }
}, {
  collections: 'CategorySub'
})

let CategorySub = mongoose.model('CategorySub', categorySubSchema, 'CategorySub')
module.exports = CategorySub
