const mongoose = require('mongoose');
const User = require('./user');
var Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
    user_id :{ type:mongoose.Schema.Types.String,ref:'user'},
    content: { type: String, required: false},
    time: { type: Date, default: Date.now },
    doc_id: { type: String, required: true},
    thumb_up: { type: Number, required: false,default:0},
    thumb_down: { type: Number, required: false,default:0},
    com_id: { type: String, required: false},
    reply_id: { type: String, required: false,default:null},
    childs:{type:Array,reuired:false}
});

const Comment = module.exports = mongoose.model('comment', CommentSchema);
