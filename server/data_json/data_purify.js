// 数据提纯

const fs = require('fs')
fs.readFile('./goods.json', 'utf8', (err, data) => {
  if (err) {
    console.log('文件读取失败')
    return
  }
  let dataNew = JSON.parse(data)
  let pushData = []
  dataNew.RECORDS.map((value, index) => {
    if (value.IMAGE1) {
      console.log(value.NAME)
      pushData.push(value)
      fs.writeFile('./newGoods.json', JSON.stringify(pushData), function (err) {
        if (err) {
          console.log('写文件操作失败')
        } else {
          console.log('写文件操作成功')
        }
      })
    }
  })
})
