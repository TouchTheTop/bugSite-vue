const mongoose = require('mongoose')

const CoinSchema = mongoose.Schema({
  coins : { type:Number, required : true },
  receive_id : { type:String, required : true ,ref:'user'},
  created_at : { type : Date, default : Date.now },
  isplus:{type:Boolean,default:true},
  source:{type:Number,default:0},
  source_id:{type:String,required:false,ref:'user'}
})

const Coin = module.exports = mongoose.model('coin',CoinSchema)
