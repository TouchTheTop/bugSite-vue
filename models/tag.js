const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    name: {type:String,require:true},
    user_id:{type:String,require:true},
    nums:{type:String},
    create_at : { type : Date, default : Date.now },
    update_at : { type : Date, default : Date.now }
})

const Tag = module.exports = mongoose.model('tag',tagSchema)