const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
  title : { type:String, required : true },
  user_id:{ type:String, required : true },
  doc_id: { type: String, required: true },
  poster : { type: String, required: false },
  asset : { type: String, required: true },
  content:{ type: String, required: true },
  img : { type: String, required: false },
  like:{ type: Number, required: false },
  eye:{ type: String, required: false },
  tag:[{tagid:String,name:String}],
  created_at : { type : Date, default : Date.now },
  update_at : { type : Date, default : Date.now }
})

const List = module.exports = mongoose.model('list',listSchema)
