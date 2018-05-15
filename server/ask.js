const express = require('express')
const User = require('../models/user');
const Ask = require('../models/ask');
const crypto = require('crypto');


module.exports = {
  //添加问题
  add:function(query,callback){
    Ask.create(query)
      .then(res => {
        callback(res)
      })
      .catch(err => {
        console.log(err);
      })
  }
}
