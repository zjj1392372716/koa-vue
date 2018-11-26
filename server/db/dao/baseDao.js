// baseDao.js
class BaseDao {
  /**
   * 子类构造传入对应的 Model 类
   *
   * @param Model
   */
  constructor (Model) {
    this.Model = Model
  }
  /**
   * 使用 Model save() 添加 doc
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  save (obj) {
    return new Promise((resolve, reject) => {
      let entity = new this.Model(obj)
      entity.save((error, result) => {
        if (error) {
          console.log('save error--> ', error)
          reject(error)
        } else {
          console.log('save result--> ', result)
          resolve(result)
        }
      })
    })
  }
  /**
   * 查找一条数据
   * @param {*} condition 查询条件
   * @param {*} constraints 投影
   */
  findOne (condition, constraints) {
    return new Promise((resolve, reject) => {
      this.Model.findOne(condition, constraints ? constraints : null, (error, results) => {
        if (error) {
          console.log('findOne error--> ', error)
          reject(error)
        } else {
          console.log('findOne results--> ', results)
          resolve(results)
        }
      })
    })
  }
  /**
   * 查询所有
   * @param {} condition 查询对象
   * @param {*} constraints 投影
   */
  findAll (condition, constraints) {
    return new Promise((resolve, reject) => {
      this.Model.find(condition, constraints ? constraints : null, (error, results) => {
        if (error) {
          console.log('findAll error--> ', error)
          reject(error)
        } else {
          console.log('findAll results--> ', results)
          resolve(results)
        }
      })
    })
  }

  /**
   * 分页查询
   * @param {*} condition 查询对象
   * @param {*} start 开始位置
   * @param {*} num 一页几条数据
   */
  findAllByPage (condition, start, num) {
    console.log(condition)
    console.log(start)
    console.log(num)
    return new Promise((resolve, reject) => {
      this.Model.find(condition)
        .skip(start).limit(num).exec((err, record) => {
          if (err) {
            console.log('findAllByPage error --> ', err)
            reject(err)
          } else {
            resolve(record)
          }
        })
    })
  }
}

module.exports = BaseDao
