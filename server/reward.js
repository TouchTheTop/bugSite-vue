const express = require('express')
const User = require('../models/user');
const Reward = require('../models/reward');
const crypto = require('crypto');


module.exports = {
  add(query, callback) {
    console.log(query)
    query.reward_id = crypto.createHmac('sha256', query.toString())
      .update('user password')
      .digest('hex');
    Reward.create(query)
      .then(res => {
        console.log(res);
        callback(res);
      })
      .catch(err => {
        console.log(err)
      })

  },
  //查询
  get(query, callback) {
    Reward.find(query)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        console.log(err);
      })
  },
  //获取悬赏的coin
  getOne(query,callback){
    Reward.findOne(query)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        console.log(err);
      })

  },
  //设置
  set(query, callback) {
    Reward.findOneAndUpdate({reward_id:query.reward_id},
      {
        $set: {
          receive_id: query.receive_id,
          status:1
        }
      }, {
        new: true
      })
      .then(res => {
        callback(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

}
