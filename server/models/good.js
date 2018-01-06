var mongoose = require('mongoose')
var Schema = mongoose.Schema

var produtSchema = new Schema({
  'goods': [
    {
      'name': String,
      'typeName': String
    }
  ]
})

module.exports = mongoose.model('sellers', produtSchema)
