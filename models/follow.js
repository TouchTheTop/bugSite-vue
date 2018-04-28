const mongoose = require('mongoose');
const User = require('./user');

const FollowSchema = mongoose.Schema({
  user_id :{ type:mongoose.Schema.Types.String,ref:'user'},
  label_id : { type : String, required : false ,ref:'label' },
  follow_id : { type : String, required : false ,ref:'user' },
  update_at : { type : String, required : false },
  typed:{ type: Number,required: true}
})

const Tag = module.exports = mongoose.model('follow',FollowSchema)
