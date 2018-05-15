const express = require('express')
const router = express.Router()
const Ask = require('../server/ask')
const code = require('./code');
const crypto = require('crypto');
const { check, oneOf, validationResult } = require('express-validator/check');
router.post('/add',oneOf([
  check('content').isLength(10)
]),(req,res) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    res.json(code.msg(1,'参数错误'));
    res.end();
    return
  }
  let query = req.body;

  query.ask_id = crypto.createHmac('sha256', query+Math.random())
    .update('user ask')
    .digest('hex');

  if(req.session.user) {
    query.user_id = req.session.user_id;
    Ask.add(query, function (result) {
      res.send(code.msg(0))
    })
  }else{
    res.send(code.msg(1,'未登录'))
  }

})

module.exports = router
