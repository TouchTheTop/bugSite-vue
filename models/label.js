const mongoose = require('mongoose');

const LabelSchema = mongoose.Schema({
  name: {type:String,require:true},
  label_id:{type:String,require:true},
  create_at : { type : Date, default : Date.now },
  update_at : { type : Date, default : Date.now }
})

const Tag = module.exports = mongoose.model('label',LabelSchema)
