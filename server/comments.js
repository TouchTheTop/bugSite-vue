const express = require('express')
const User = require('../models/user');
const Comment = require('../models/comment');
const crypto = require('crypto');
const Thumb = require('../models/Thumb');

var exportData = {
  //检查是否有添加过记录
  checkThumb: function (query, callback) {
    Thumb.findOne({user_id: query.user_id, com_id: query.com_id})
      .then(res => {
        var status = 0;
        if (res) {
          if (query.thumb == res.thumb) { //删除记录
            status = 0;
          } else
            status = 1;  //修改记录
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
    Thumb.findOneAndRemove(query).then(doc => {

    })
  },

//修改记录 关联:thumb
  editThumb: function (query) {
    Thumb.findOneAndUpdate({user_id: query.user_id, com_id: query.com_id}, {
      $set: {
        thumb: query.thumb
      }
    }, {
      new: true
    }).then(doc => {
      console.log(doc);
    })
  },

//增加记录 关联:thumb
  addThumb: function (query, callback) {
    Thumb.create(query).then(doc => {
      console.log(doc);
    });
  },

  addNum: function (query, callback) {
    Comment.findOneAndUpdate({com_id: query.com_id},
      {
        $inc: {thumb_up: 1}
      },
      {
        new: true
      })
      .then(doc => {
        callback();
      });
  },

  cancelNum: function (query, callback) {
    if (query.thumb == 2) {
      Comment.findOneAndUpdate({com_id: query.com_id},
        {
          $inc: {thumb_down: -1}
        },
        {
          new: true
        })
        .then(doc => {
          callback();
        });
    } else {
      Comment.findOneAndUpdate({com_id: query.com_id},
        {
          $inc: {thumb_up: -1}
        },
        {
          new: true
        })
        .then(doc => {
          callback();
        });
    }


  },

  delNum: function (query, callback) {
    Comment.findOneAndUpdate({com_id: query.com_id},
      {
        $inc: {thumb_down: 1}
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
