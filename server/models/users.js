let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
  'userId': Number,
  'userName': String,
  'userPwd': String,
  'addressList': [
    {
      'addressId': String,
      'userName': String,
      'streetName': String,
      'roomNumber': String,
      'tel': Number,
      'isDefault': Boolean
    }
  ]
})
module.exports = mongoose.model('users', userSchema)
