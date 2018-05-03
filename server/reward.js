const express = require('express')
const User = require('../models/user');
const Reward = require('../models/reward');
const crypto = require('crypto');



module.exports = {
  add(query,callback) {
    console.log(query)
    query.reward_id = crypto.createHmac('sha256', query.toString())
      .update('user password')
      .digest('hex');
    Reward.create(query)
      .then(res => {
        callback(res);
      })
      .catch(err => {

      })

  },
}
