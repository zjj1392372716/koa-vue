let BaseDao = require('./baseDao')
// 倒入schema层
let shopUser = require('../shcemas/user.js')
let Goods = require('../shcemas/goods.js')
let Category = require('../shcemas/category.js')
let CategorySub = require('../shcemas/categorysub')
/**
 * user类
 */
class UserDao extends BaseDao {
  constructor () {
    super(shopUser)
  }
}

/**
 * goods类
 */
class GoodShop extends BaseDao {
  constructor () {
    super(Goods)
  }
}
/**
 * Category大类
 */
class CategoryClass extends BaseDao {
  constructor () {
    super(Category)
  }
}

/**
 * Category子类
 */
class CategorySubClass extends BaseDao {
  constructor () {
    super(CategorySub)
  }
}
module.exports = {
  UserDao,
  GoodShop,
  CategoryClass,
  CategorySubClass
}
