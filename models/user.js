const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  account : { type:String, required : true },
  pwd : { type:String, required : true },
  created_at : { type : Date, default : Date.now },
  update_at : { type : Date, default : Date.now }
})

const User = module.exports = mongoose.model('user',userSchema)
