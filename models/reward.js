const mongoose = require('mongoose')

const RewardSchema = mongoose.Schema({
  coins : { type:Number, required : false },
  status:{type:Number,required:false},
  doc_id : { type:String, required : false ,ref:'doclist'},
  receive_id : { type:String, required : false ,ref:'user'},
  reward_id : { type:String, required : true},
  created_at : { type : Date, default : Date.now },
  source_id:{type:String,required:true,ref:'user'}
})

const Reward = module.exports = mongoose.model('reward',RewardSchema)
