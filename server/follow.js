const express = require('express')
const crypto = require('crypto');
const Follow = require('../models/follow');
const label = require('./label');

var exportData = {
  add:function (query,callback) {
    Follow.findOne({follow_id:query.follow_id})
      .then(res => {
        if(res){
          callback('已关注');
        }else{
          Follow.create(query).then(res =>{
            callback('');
          });
        }
      })
  },
  getLabel:function (query,callback) {
    label.get(query,callback);
  }
}

module.exports = exportData;
