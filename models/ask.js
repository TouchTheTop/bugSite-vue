const mongoose = require('mongoose')

const AskSchema = mongoose.Schema({
  user_id:{ type:String, required : true },
  ask_id: { type: String, required: true },
  content:{ type: String, required: true },
  img : { type: String, required: false },
  tag:[{tagid:String,name:String}],
  created_at : { type : Date, default : Date.now },
  update_at : { type : Date, default : Date.now }
})

const Ask = module.exports = mongoose.model('ask',AskSchema)
