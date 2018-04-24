const express = require('express')
const multiparty = require('multiparty')
const fs = require('fs')
const crypto = require('crypto');
const router = express.Router()
const Doc = require('../models/doclist')
const Collect = require('../models/collects')
const Browse = require('../models/browse')
const Tag = require('../models/tag')
const code = require('./code');
const ObjectId = require('mongodb').ObjectId
var pageSize_a = 10;

// 查询所有
router.get('/doc', (req, res) => {
  Doc.find({})
  .sort({ update_at : -1})
  .then(doses => {
   res.json(doses)
 })
  .catch(err => {
   res.json(err)
 })
})

// 分页查询
router.post('/docOrder', (req, res) => {
  var page = req.body.page;
  var pageSize = req.body.pageSize;
  var user_id = req.params.val;
  var sort_eye = req.body.sort_eye;
  var sort_calander = req.body.sort_calander;
  var sort_like = req.body.sort_like;

  var tagid = req.body.tagid;

  var sort = {update_at : -1};

  var query = {};
  if(tagid)
  var query = {
    'tag.tagid':tagid
  }

  if(user_id){
    if(user_id==req.session.user._id){
        query.user_id = req.session.user._id;
    }
    else{
      res.json(code.noRight);
      return;
    }
  }

  if(sort_eye)
    sort = { eye : -1};
  else if(sort_like){
    sort = { like : -1};
  }



  if(!page)
    page = 1;
  if(pageSize)
    pageSize_a = pageSize;
  var Count = (parseInt(page)-1) * pageSize_a;
  Doc.find(query)
  .sort(sort)
  .limit(pageSize_a)
  .skip(Count)
  .then(doses => {
    var arr = doses;
   res.json(arr)
 })
  .catch(err => {
   res.json(err)
 })
})


// 分页查询
router.post('/docOrderMine', (req, res) => {
  var page = req.body.page;
  var pageSize = req.body.pageSize;
  var sort_eye = req.body.sort_eye;
  var sort_calander = req.body.sort_calander;
  var sort_like = req.body.sort_like;

  var tagid = req.body.tagid;

  var sort = {update_at : -1};

  var query = {};
  if(tagid)
  var query = {
    'tag.tagid':tagid
  }

  if(req.session.user){
     query.user_id = req.session.user._id;
  }else{
    res.json(code.nologin);
    return ;
  }

  if(sort_eye)
    sort = { eye : -1};
  else if(sort_like){
    sort = { like : -1};
  }



  if(!page)
    page = 1;
  if(pageSize)
    pageSize_a = pageSize;
  var Count = (parseInt(page)-1) * pageSize_a;
  Doc.find(query)
  .sort(sort)
  .limit(pageSize_a)
  .skip(Count)
  .then(doses => {
    var arr = doses;
   res.json(arr)
 })
  .catch(err => {
   res.json(err)
 })
})


//  通过关键字查询多个
router.get('/docbyval/:val', (req, res) => {
  let reg = eval('/.*'+req.params.val+'.*/');
  console.log(reg);
  if(req.params.val){
    Doc.find({
      $or:[{
        title:{$regex:reg}
      }]
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
  }

})

//  通过关键字查询多个
router.get('/docbyvalMine/:val', (req, res) => {
  let reg = eval('/.*'+req.params.val+'.*/');
  var user_id = '';
  if(req.session.user){
    user_id = req.session.user._id;
  }
  else{
    res.json(code.nologin);
  }
  if(req.params.val){
    Doc.find({
      user_id:user_id,
      $or:[{
        title:{$regex:reg}
      }]
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
  }

})

// 通过关键字查询单个
router.get('/doc/:id', (req, res) => {
  Doc.findById(req.params.id)
  .then(doc => {
    res.json(doc)
  })
  .catch(err => {
    res.json(err)
  })
})

// 添加
router.post('/doc/add', (req, res) => {
  var query = req.body;
  query.like = 0;
  query.eye = 0;
  //使用Movie model上的create方法储存数据
  if(req.session.user)
  {
    query.user_id = req.session.user._id;
    query.doc_id =  crypto.createHmac('sha256', query+Math.random()*1000000)
    .update('user beewal')
    .digest('hex');
    Doc.create(query, (err, doc) => {
      if (err) {
        res.json(code.addFail)
      } else {
        res.json(code.addSuccess)
      }
    })
  }
  else
    res.json(code.nologin)
})

//修改
router.post('/edit',(req,res) => {
  Doc.findOneAndUpdate(
    {_id:req.body.id},
    {
      $set:{
        title:req.body.title,
        asset:req.body.asset,
        tag:req.body.tag,
        update_at:Date.now()
      }
    },{
      new: true
    })
  .then(doc => res.json(code.success))
  .catch(err => res.json(err))
});


//删除
router.delete('/doc/:id',(req,res) => {
  Doc.findOneAndRemove({
    _id : req.params.id
  })
  .then(doc => res.send(code.delSuccess))
  .catch(err => res.json(err))
})

//上传图片
router.post('/upimg',(req,res) => {
  var form = new multiparty.Form();
  form.encoding = 'utf-8';
  form.uploadDir = './static/file';
  form.maxFilesSize = 2* 1024 * 1024;

  form.parse(req, function(err, fields, files) {
    if(err)
      console.log(err);
    console.log(fields);
    console.log(files.file[0].path);
    // files.file[0].path = files.file[0].path.split('static\\')[1];
      //同步重命名文件名
      // fs.renameSync(files.file[0].path,files.file[0].originalFilename);
      res.send(files.file[0]);

    });
})

router.post('/like',(req,res) => {
  if(req.session.user){
    let query = {
      doc_id:req.body.doc_id,
      user_id:req.session.user._id
    }
    Collect.create(query, (err, doc) => {
      if (err) {
        res.json(err)
      } else {
        Doc.findOne({_id:req.body.doc_id})
        .then(docs => {
         Doc.findOneAndUpdate(
          {_id:req.body.doc_id},
          {
            $set:{
              like:parseInt(docs.like)+1
            }
          },{
            new: true
          })
         .then(doc => res.json(code.likeSuccess))
         .catch(err => res.json(err))
       })


      }
    })
  }

  else{
   res.json(code.nologin)
 }

})

router.post('/browse',(req,res) => {
  if(req.session.user && req.body.doc_id){
    let query = {
      doc_id:req.body.doc_id,
      user_id:req.session.user._id
    }

    var promise = Browse.findOne(query, (err,browse) => {
     console.log(browse);
     if(!browse){
       Browse.create(query, (err, doc) => {
        if (err) {
          res.json(err)
        } else {
          Doc.findOne({_id:req.body.doc_id})
          .then(docs => {
           Doc.findOneAndUpdate(
            {_id:req.body.doc_id},
            {
              $set:{
                eye:parseInt(docs.eye)+1
              }
            },{
              new: true
            })
           .then(doc => {})
           .catch(err => res.json(err))
         })


        }
      })
     }
   })

  }

  else{
   res.json(code.nologin)
 }

})

router.post('/iflike',(req,res) => {
  if(req.session.user){
    let query = {
      doc_id:req.body.doc_id,
      user_id:req.session.user._id
    }
    console.log(query);
    Collect.find(query, (err, doc) => {
      if (err) {
        res.json(err)
      } else {
        if(doc.length)
          res.json(code.iflike)
        else
          res.json(code.nolike)
      }
    })
  }

  else{
   res.json(code.nologin)
 }

})


router.post('/tag',(req,res) => {
    Tag.find({},(err,doc) => {
      if(err){
        res.json(err);
      }else {
        res.json(doc);
      }
    });

})


router.post('/newtag',(req,res) => {
  var name = req.body.name;
  var query = {
    name:name
  }
  if(req.session.user){
    query.user_id = req.session.user._id;
    Tag.create(query,(err,doc) => {
      if(err){
        res.json(err);
      }else {
        res.json(code.success);
      }
    });
  }else{
    res.json(code.nologin);
  }
})

module.exports = router
