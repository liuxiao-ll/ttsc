var express = require('express')
var router = express.Router()
var Users = require('../models/users.js')
var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/eleme')
// 注册
router.post('/register', (req, res, next) => {
  let userName = req.body.userName
  let userPwd = req.body.userPwd
  Users.find({userName: userName}, (err, doc) => {
    if (err) {
      res.json({
        status: '2',
        result: err.message
      })
    } else {
      if (doc.length === 1) {
        res.json({
          status: '3',
          result: '用户名已存在'
        })
      } else {
        let arr = []
        let max
        if (doc.length === 0) {
          max = 100000001
        } else {
          doc.forEach((item) => {
            arr.push(item.userId)
          })
          max = Math.max(...arr)
        }
        // 错误写法。每次在数据库中加数组成员都要new一个实例

        // let user = {
        //   userId: max + 1,
        //   userName: userName,
        //   userPwd: userPwd
        // }
        // doc.push(user)
        // console.log(doc)
        // doc.save((err1, doc1) => {
        //   if (err1) {
        //     res.json({
        //       status: '1',
        //       msg: 'err1.message'
        //     })
        //   } else {
        //     res.json({
        //       status: '0',
        //       msg: '',
        //       result: ''
        //     })
        //   }
        // })
        let user = new Users({
          userId: max + 1,
          userName: userName,
          userPwd: userPwd
        })
        user.save((err1, doc1) => {
          if (err1) {
            res.json({
              status: '1',
              msg: 'err1.message'
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            })
          }
        })
      }
    }
  })
})

router.post('/login', (req, res, next) => {
  let userName = req.body.userName
  let userPwd = req.body.userPwd
  Users.findOne({userName: userName}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        result: err.message
      })
    } else {
      if (doc.length === 0) {
        res.json({
          status: '2',
          result: '用户名不存在'
        })
      } else {
        if (doc.userPwd !== userPwd) {
          res.json({
            status: '3',
            result: '密码不正确！'
          })
        } else {
          res.cookie('userId', doc.userId, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          res.cookie('userName', doc.userName, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          res.json({
            status: '0',
            result: '登陆成功'
          })
        }
      }
    }
  })
})

// 新增地址
router.post('/addCart', (req, res, next) => {
  let userId = req.cookies.userId
  let userName = req.body.userName
  let tel = req.body.tel
  let streetName = req.body.streetName
  let roomNumber = req.body.roomNumber
  Users.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        result: err.message
      })
    } else {
      doc.addressList.push({
        addressId: maxId(doc.addressList, 'addressId') + 1,
        userName: userName,
        tel: tel,
        streetName: streetName,
        roomNumber: roomNumber,
        isDefault: false
      })
      doc.save((err1, doc1) => {
        if (err1) {
          res.json({
            status: '1',
            result: err.message
          })
        } else {
          res.json({
            status: '0',
            result: 'sucs'
          })
        }
      })
    }
  })
})

// 地址列表
router.get('/addressList', (req, res, next) => {
  let userName = req.cookies.userName
  Users.findOne({userName: userName}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        result: err.message
      })
    } else {
      res.json({
        status: '0',
        result: doc.addressList
      })
    }
  })
})

// 选取默认
router.post('/choseDefault', (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  let address = {}
  Users.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        result: err.message
      })
    } else {
      doc.addressList.forEach((item) => {
        if (item.addressId === addressId) {
          address = item
          item.isDefault = true
        } else {
          item.isDefault = false
        }
      })
      doc.save((err1, doc1) => {
        if (err1) {
          res.json({
            status: '1',
            result: err.message
          })
        } else {
          res.json({
            status: '0',
            result: address
          })
        }
      })
    }
  })
})

// 订单页面抓数据
router.get('/address', (req, res, next) => {
  let userName = req.cookies.userName
  Users.findOne({userName: userName}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        result: err.message
      })
    } else {
      let address = {}
      doc.addressList.forEach((item) => {
        if (item.isDefault === true) {
          address = item
        }
      })
      res.json({
        status: '0',
        result: address
      })
    }
  })
})
function maxId(doc, arg) {
  let arr = []
  let max
  if (doc.length === 0) {
    max = 100000001
  } else {
    doc.forEach((item) => {
      arr.push(item[arg])
    })
    max = Math.max(...arr)
  }
  return max
}

module.exports = router
