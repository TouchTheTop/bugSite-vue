const express = require('express')
const router = express.Router()
const code = require('./code');
const crypto = require('crypto');
const LabelServer = require('../server/label');

//新增系统标签
router.post('/addlabel',(req,res) => {
  console.log('system');
  let query = req.body;
  query.label_id = crypto.createHmac('sha256',query.name)
    .update('system label')
    .digest('hex');

  LabelServer.add(query,function (msg) {
    if(!msg)
    res.send(code.success);
    else{
      res.send({
        errcode:1,
        msg:msg
      })
    }
  });
})

//查询
router.get('/getlabel',(req,res) => {
  let query = req.body;
  LabelServer.get(query,function (result) {
    res.json(result);
  });
})


module.exports = router
