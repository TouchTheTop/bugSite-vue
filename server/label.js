const express = require('express')
const label = require('../models/label');
const crypto = require('crypto');

var exportData = {
  add:function (query,callback) {
    label.findOne({name:query.name})
      .then(res => {
        if(res){
          callback('该标签已存在');
        }else{
          label.create(query).then(res =>{
            callback('');
          });
        }
      })
  },
  get:function (query,callback) {
    label.find(query,['name'])
      .then(res => {
        callback(res);
      })
  }
}

module.exports = exportData;
