const mongoose = require('mongoose');
const User = require('./user');
var Schema = mongoose.Schema;

const ThumbSchema = mongoose.Schema({
  user_id :{ type:mongoose.Schema.Types.String,ref:'user'},
  thumb: { type: Number, required: false,default:0},
  com_id: { type: String, required: false},
  created_at : { type : Date, default : Date.now },
  update_at : { type : Date, default : Date.now }
});

const Thumb = module.exports = mongoose.model('thumb', ThumbSchema);
