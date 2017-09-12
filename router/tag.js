const express = require('express')
const multiparty = require('multiparty')
const fs = require('fs')
const router = express.Router()
const code = require('./code');

const Tag = require('../models/tag')
const Doc = require('../models/doclist')

var arr =0;

router.get('/byuser',(req,res) => {
  if(req.session.user){

    Tag.find({user_id:req.session.user._id})
    .then(tag => {

      for(let i=0;i<tag.length;i++){
        Doc.find({'tag.tagid':tag[i]._id})
        .then(doc => {
          Tag.findOneAndUpdate(
            {_id:tag[i]._id},
            {
              $set:{
                nums:doc.length
              }
            },{
              new: true
            })
          .then(doc => {})
          .catch(err => res.json(err))
        })
        .catch(err => {
          console.log(e);
        })
      } console.log(arr);
    })
    .catch(err => {
      res.json(err.message);
    })

    Tag.find({user_id:req.session.user._id})
    .then(tag => {res.json(tag)})
    .catch(err => {
      res.json(err.message);
    })
  }else{
    res.json(code.nologin);
  }
})

router.post('/delete',(req,res) => {
 Tag.findOneAndRemove({
  _id : req.body.id
})
 .then(doc => res.send(code.delSuccess))
 .catch(err => res.json(err))
})

router.post('/update',(req,res) => {
 Tag.findOneAndUpdate(
  {_id : req.body.id},
  {
    $set:{
      name:req.body.name,
      update_at:Date.now()
    }
  },
  {new:true}
  )
 .then(doc =>
   {
    asysTag(req.body.id,req.body.name);
    res.send(code.upSuccess);
  })
 .catch(err => res.json(err))

})


function asysTag(id,name){
  Doc.find({'tag.tagid':id})
  .then(res2 => {
    for(i in res2){
      for(j in res2[i].tag){
       if(res2[i].tag[j].tagid == id){
         res2[i].tag[j].name = name;
         res2[i].save(function(err, docs){
          if(err) console.log(err);
          console.log('保存成功：' + docs);
        });
       }
     }
   }
 })
  .catch(err => {
    console.log(err);
  })
}


module.exports = router;