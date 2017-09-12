const mongoose = require('mongoose')

const collectSchema = mongoose.Schema({
  doc_id : { type:String, required : true },
  user_id : { type:String, required : true },
  collect_at : { type : Date, default : Date.now }
})

const Collect = module.exports = mongoose.model('collect',collectSchema)