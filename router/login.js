const express = require('express')
const router = express.Router()
const crypto = require('crypto');
const User = require('../models/user');
const code = require('./code').code;
const Coin = require('../server/coin');

let maxage = 1000*60*24;

router.post('/',(req,res) => {
    var acc = req.body.account;
    var pwd = req.body.pwd;
    var remember = req.body.remember;
    if(remember){
        maxage = maxage*7;
    }
    console.log(maxage);
    const hash = crypto.createHmac('sha256', pwd)
    .update('user password')
    .digest('hex');

    let query = {
        account:acc
    }

    User.findOne(query,(err,doc) => {
        if(err){
            console.log(err);
        }else{
            if(!doc){
                res.json(code.noUser)
            }else{
                query.pwd = hash;
                User.findOne(query,(err,doc) => {
                    if(err){
                        console.log(err);
                    }else{
                        if(!doc){
                            res.json(code.pwdError)
                        }else{
                            doc.pwd="";
                            req.session.user = doc;
                            console.log(code.success)
                            res.json(code.success)
                        }
                    }
                })
            }
        }
    })
      .catch((err) => {
        console.log(err);
      })

})

router.post('/register',(req,res) => {
    var acc = req.body.account;
    var pwd = req.body.pwd;
 console.log(pwd);
    const hash = crypto.createHmac('sha256', pwd.toString())
    .update('user password')
    .digest('hex');

    count = parseInt(Math.random() * 100000000);

    const bw_id = crypto.createHmac('sha256', count.toString())
        .update('beewal identify')
        .digest('hex');

    const user_id = crypto.createHmac('sha256', count.toString())
    .update('beewal identify')
    .digest('hex');

    let query = {
        account:acc,
        bw_id: bw_id,
        user_id:user_id
    }

    User.findOne(query,(err,doc) => {
        if(err){
            console.log(err);
        }else{
            if(!doc){
                query.pwd = hash;
                User.create(query,(err,doc) => {
                    if(err){
                        res.json(err)
                    }else{
                       let b_query = {
                         user_id:user_id,
                         source:4
                       }
                        Coin.add(b_query,function (result) {

                          res.json(code.success)
                        });
                    }
                })
            }else{
                res.json(code.duplUser)
            }
        }
    })


})


router.get('/user',(req,res) => {
    res.json(req.session.user);
})

router.get('/quit',(req,res) => {
    if(req.session.user)
        req.session.user = null;
    if(!req.session.user)
    res.json(code.quit)
})

module.exports = {maxage:maxage,router:router}
