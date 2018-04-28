const mongoose = require('mongoose');
const User = require('./user');
var Schema = mongoose.Schema;

const MsgSchema = mongoose.Schema({
  receive_id :{ type:mongoose.Schema.Types.String,ref:'user'},
  msg_id: { type: String, required: false},
  created_at : { type : Date, default : Date.now },
  typed : { type : Number, default : 0 },
  send_id:{type:String,ref:'user'},
  is_read:{type:Boolean,required:false},
  Link:{type:String,required:false}
});

const Msg = module.exports = mongoose.model('msg', MsgSchema);
