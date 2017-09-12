const mongoose = require('mongoose')

const collectSchema = mongoose.Schema({
  doc_id : { type:String, required : true },
  user_id : { type:String, required : true },
  browse_at : { type : Date, default : Date.now }
})

const Collect = module.exports = mongoose.model('browse',collectSchema)