const express = require('express')
const User = require('../models/user');
const Doc = require('../models/doclist');
const crypto = require('crypto');
const Like = require('../models/Like');

var exportData = {
  //检查是否有添加过记录
  checkThumb: function (query, callback) {
    Like.findOne({user_id: query.user_id, doc_id: query.doc_id})
      .then(res => {
        var status = 0;
        if (res) { //删除记录
            status = 0;
        } else {
          status = 2; //未记录过
        }
        console.log('未记录' + status);
        callback(status);
      })
      .catch(function (err) {
        console.log(err);
      })
  },

//删除记录 关联:thumb
  deleteThumb: function (query) {
    Like.findOneAndRemove(query).then(doc => {

    })
  },


//增加记录 关联:thumb
  addThumb: function (query) {
    Like.create(query);
  },

  addNum: function (query, callback) {
    Doc.findOneAndUpdate({doc_id: query.doc_id},
      {
        $inc: {like: 1}
      },
      {
        new: true
      })
      .then(doc => {
        callback();
      });
  },

  cancelNum: function (query, callback) {
      Doc.findOneAndUpdate({doc_id: query.doc_id},
        {
          $inc: {like: -1}
        },
        {
          new: true
        })
        .then(doc => {
          callback();
        });

  }

}


module.exports = exportData;
