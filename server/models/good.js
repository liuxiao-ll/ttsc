var mongoose = require('mongoose')
var Schema = mongoose.Schema

var produtSchema = new Schema({
  'seller': {
    'name': String
  },
  'goods': [
    {
      'name': String,
      'typeName': String,
      'foods': [{
        'name': String,
        'price': Number,
        'oldPrice': String,
        'description': String,
        'sellCount': Number,
        'rating': String,
        'info': String,
        'icon': String,
        'image': String,
        'ratings': [{
          'username': String,
          'rateTime': Number,
          'ratetypeName': Number,
          'text': String,
          'avatar': String
        }]
      }]
    }
  ]
})

module.exports = mongoose.model('sellers', produtSchema)
