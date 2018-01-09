let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
  'userId': Number,
  'userName': String,
  'userPwd': String
})
module.exports = mongoose.model('users', userSchema)
