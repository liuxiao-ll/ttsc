var express = require('express')
var router = express.Router()
var Goods = require('../models/good')
var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/eleme')

mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected.')
})

router.get('/', (req, res, next) => {
  let param = {}
  Goods.findOne(param, (err, doc) => {
    console.log(doc.goods[0].typeName)
    console.log(doc.goods.length)
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        result: doc
      })
    }
  })
})

module.exports = router
