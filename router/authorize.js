const express = require('express')
const router = express.Router()
const User = require('../models/user');
const code = require('./code');
//bw_id 用户标识
var getAuthorize = function (req,res,next,callback) {
 console.log('查询授权');

  //   if(!req.body.bw_id){
  //        res.json(code.noAuthorize);
  //       return false;
  // }

    let query = {
        bw_id : req.body.bw_id
    }

    User.findOne(query)
        .then((doc) => {
                if (!doc) {
                    // res.json(code.noAuthorize);
                  callback&&callback();
                } else {
                  callback&&callback();
                }

        })
      .catch(err => {
        console.log(err);

      })
}

module.exports = getAuthorize;
