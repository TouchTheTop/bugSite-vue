const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
  title : { type:String, required : true },
  user_id:{ type:String, required : true },
  poster : String,
  asset : String,
  content:String,
  img : String,
  like:String,
  eye:String,
  tag:[{tagid:String,name:String}],
  created_at : { type : Date, default : Date.now },
  update_at : { type : Date, default : Date.now }
})

const List = module.exports = mongoose.model('list',listSchema)
