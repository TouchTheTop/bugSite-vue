const express = require('express')
const router = express.Router()
const User = require('../models/user');
const Comment = require('../models/comment');
const code = require('./code');
const crypto = require('crypto');
const Thumb = require('../models/Thumb');
const Server = require('../server/comments');
const FollowServer = require('../server/follow');
const MsgServer = require('../server/msg');
const Coin = require('../server/coin');
const Reward = require('../server/reward');

// 切换头像
router.post('/avtar', (req, res) => {
  //bw_id 用户标识
  console.log('修改头像');
  console.log(req.body);
  let query =
    {
      bw_id: req.body.bw_id
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

router.post('/comments', (req, res) => {
  console.log('查看用户评论');

  var query = req.body, result = [];
  if (query.content) { //模糊查询处理
    query.content = RegExp(query.content, "i");
  }
  console.log(query);
  Comment.find(query).populate({path: 'user', select: 'avtar'}) //查询一级评论
    .then(doc => {
      result = doc;
      if (!doc.length) //以查找完毕
        res.json(code.success);
      getList(result, res);
    })
    .catch(err => {
      console.log(err);
    })
})

//查询评论
function getList(results, res) {
  gets(results, res);

  function gets(result, res) {
    result.map((item) => {
      Comment.find({reply_id: item.com_id}) //查询下一级评论
        .then(dochild => {

          item.childs = dochild;

          if (!dochild.length) //以查找完毕
          {
            res.json(results);
          }
          else {
            arguments.callee(item.childs, res);
          }
        })
    });
  };

}

router.post('/follow', (req, res) => {
  let query = req.body;
  FollowServer.add(query, function (msg) {
    if (!msg) {
      var msg_query= query,time = new Date();
      msg_query.is_read = 0;
      msg_query.typed = 1;
      msg_query.msg_id = crypto.createHmac('sha256', time + query)
        .update('user msg')
        .digest('hex');
      msg_query.receive_id = query.user_id;
      MsgServer.add(msg_query, function () {
        res.send(code.success);
      })
    }
    else {
      res.send({
        errcode: 1,
        msg: msg
      })
    }
  });
})

//查找用户关注的标签
router.get('/follow', (req, res) => {
  let query = req.body;
  FollowServer.getLabel(query, function (result) {
      res.json(result);
  });
})

//查找用户关注的标签
router.get('/getUnread', (req, res) => {
  let query = req.body;
  MsgServer.getMsg(query, function (result) {
    MsgServer.getMsgNum(query,function (result1) {
      let body = {
        count:result1,
        list: result
      }
      res.json(body);
    })
  });
})

//查找用户关注的标签
router.post('/rewardSomeOne', (req, res) => {
  let query = req.body;
  Coin.reduce(query, function (result) {
    res.json(code.success);
  });
})

//新增悬赏
router.post('/addReward', (req, res) => {
  let query = req.body;
  Reward.add(query, function (result) {
    res.json(code.success);
  });
})

router.post('/comments/add', (req, res) => {
  console.log('增加用户评论');
  var query = req.body, com_id = query.com_id, time = new Date();
  //新增文章评论
  if (!query.isThumb) {  //添加评论
    query.com_id = crypto.createHmac('sha256', time + query)
      .update('user password')
      .digest('hex');

    Comment.create(query)
      .then(doc => {
        res.json(code.success);
      })
      .catch(err => {
        console.log(err);
      });
  } else { //

    var queryThumb = {
      user_id: query.user_id,
      com_id: query.com_id,
      thumb: query.isThumb
    }, thumbType = Server.checkThumb(queryThumb, function (status) {
      status = parseInt(status);
      console.log(status);
      switch (status) {
        case 0:
          Server.deleteThumb(queryThumb);
          break;
        case 1:
          Server.editThumb(queryThumb);
          break;
        case 2:
          Server.addThumb(queryThumb);
          break;
      }

      if (status == 2) {
        Server.addNum(queryThumb, function () {
          res.send(code.success);
        });
      } else if (status == 1) {
        Server.delNum(queryThumb, function () {
          res.send(code.success);
        });
      } else if (status == 0) {  //取消记录
        Server.cancelNum(queryThumb, function () {
          res.send(code.success);
        });
      }

    });


  }

})


module.exports = router;
