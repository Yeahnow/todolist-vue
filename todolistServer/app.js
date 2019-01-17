const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// 引入mongoose中间件来连接驱动数据库
const mongoose = require('mongoose')

// 连接mongodb数据库
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})

// 监听连接状态
mongoose.connection.once('open', () => {
  console.log('数据库连接成功')
})

const listSchema = new mongoose.Schema({ // 创建schema约束数据类型
  text: String
})
const ListModel = mongoose.model('list', listSchema) // 创建model

// 使用badyParser解析传递到req的body消息体中的数据，因为axios的post默认传递的是json格式的数据，
// 所以使用bodyParser.json()来解析
const jsonParser = bodyParser.json()

// 以下是获取、添加、删除数据的路由程序
app.get('/getData', (req, res) => {
  ListModel.find({}, (erro, docs) => {
    res.send(docs)
    res.end()
  })
})

app.post('/uploadData', jsonParser, (req, res) => {
  ListModel(req.body).save((error) => {
    if(error) throw error
    ListModel.find({}, (erro, docs) => {
      res.send(docs)
      res.end()
    })
  })
})

// app.delete('/deleteData', jsonParser, (req, res) => {
//   const text = req.body.text
//   ListModel.findOne({text: text}, (err, data) => {
//     if(err) throw err
//     data.remove((err) => {
//       if(err) throw err
//       ListModel.find({}, (erro, docs) => {
//         res.send(docs)
//         res.end()
//       })
//     })
//   })
 
// })

app.delete('/deleteData', jsonParser, (req, res) => {
  const restarr = req.body.array
  restarr.forEach((item, index) => {
    ListModel.findOne(item, (err, data) => {
      if(err) throw err
      data.remove((err) => {
        if(err) throw err
        if(index === (restarr.length - 1)) {
          ListModel.find({}, (err, docs) => {
            res.send(docs)
            res.end()
          })
        }
      })
    })
  })
})

app.listen(3000)
console.log('server is on port 3000')