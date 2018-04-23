const express = require('express')
const router = express.Router()
const User = require('../models/user');
const Comment = require('../models/comment');
const code = require('./code');
const crypto = require('crypto');

// 切换头像
router.post('/avtar', (req, res) => {
    //bw_id 用户标识
    console.log('修改头像');
    console.log(req.body);
    let query =
    {
        bw_id : req.body.bw_id
    }
    User.findOneAndUpdate(query,
        {
            $set: {
                avtar: req.body.avtar
            }
        }, {
            new: true
        })
        .then((doc) => {
        if (err) {
            console.log(err);
        } else {
            if (!doc) {
                res.json(code.success);
            } else {
                res.json(code.duplUser)
            }
        }
    })
        .catch(err => res.json(err))
})

router.post('/comments',(req,res)=>{
    console.log('查看用户评论');

    var query = req.body,result = [];
  if(query.content){ //模糊查询处理
    query.content = RegExp(query.content,"i");
  }
  console.log(query);
    Comment.find(query).populate({path:'user',select:'avtar'}) //查询一级评论
    .then(doc => {
      result = doc;
      if(!doc.length) //以查找完毕
        res.json(code.success);
      getList(result,res);
    })
    .catch(err => {
        console.log(err);
    })
})

//查询评论
function getList(results,res) {
  gets(results,res);
  function gets(result,res){
    result.map((item) => {
      Comment.find({reply_id: item.com_id}) //查询下一级评论
        .then(dochild => {

          item.childs = dochild;

          if(!dochild.length) //以查找完毕
          {
            res.json(results);
          }
          else{
            arguments.callee(item.childs,res);
          }
        })
    });
  };

}

router.post('/comments/add', (req, res) => {
    console.log('增加用户评论');
    var query = req.body,com_id = query.com_id,time = new Date();
     //新增文章评论
    if(!query.isThumb){  //添加评论
      query.com_id = crypto.createHmac('sha256', time+query)
        .update('user password')
        .digest('hex');

      Comment.create(query)
        .then(doc => {
          res.json(code.success);
        })
        .catch(err => {
          console.log(err);
        });
    }else{
      if(query.isThumb==1) {
        Comment.findOneAndUpdate({com_id: query.reply_id},
          {
            $inc: {thumb_up: 1}
          },
          {
            new: true
          })
          .then(doc => {
            res.json(code.success);
          });
      }else if(query.isThumb==2){
        Comment.findOneAndUpdate({com_id: query.reply_id},
          {
            $inc: {thumb_down: 1}
          },
          {
            new: true
          })
          .then(doc => {
            res.json(code.success);
          });
      }

    }

})

module.exports = router;
