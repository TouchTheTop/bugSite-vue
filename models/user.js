const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  account : { type:String, required : true },
  user_id: { type: String, required: false },
  bw_id: { type: String, required: false },
  pwd : { type:String, required : true },
  avtar: { type: String, required: false },
  created_at : { type : Date, default : Date.now },
  update_at : { type : Date, default : Date.now }
})

const User = module.exports = mongoose.model('user',userSchema)
