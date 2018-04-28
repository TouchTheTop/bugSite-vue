const express = require('express')
const crypto = require('crypto');
const Msg = require('../models/msg');

var exportData = {
  //添加消息
  add:function (query,callback) {
    Msg.findOne({msg_id:query.msg_id})
      .then(res => {
        if(res){
          callback('已存在');
        }else{
          Msg.create(query).then(res =>{
            callback('');
          });
        }
      })
  },
  getMsg:function (query,callback) {
    Msg.find(query)
      .then(res => {
        callback(res);
      })
  },
  getMsgNum:function (query,callback) {
    Msg.count(query)
      .then(res => {
        callback(res);
      })
  }
}

module.exports = exportData;
