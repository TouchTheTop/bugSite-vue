const mongoose = require('mongoose');
const User = require('./user');
var Schema = mongoose.Schema;

const LikeSchema = mongoose.Schema({
  user_id :{ type:mongoose.Schema.Types.String,ref:'user'},
  doc_id: { type: String, required: false},
  created_at : { type : Date, default : Date.now },
  update_at : { type : Date, default : Date.now }
});

const Thumb = module.exports = mongoose.model('like', LikeSchema);
