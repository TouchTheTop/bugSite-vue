const express = require('express')
const User = require('../models/user');
const Coin = require('../models/coin');
const crypto = require('crypto');

const coinsNum = function (source, coin) {
  let coins = 0;
  switch (parseInt(source)) {
    case 0:
      break;
    case 1:
      coins = 2;
      break; //新增文章
    case 2:
      coins = Coin.getCoins();
      break;
    case 3:
      coins = coin;
      break;
    case 4:
      coins = 50;  //注册新用户所得
      break;
  }
  return coins;
}

module.exports = {
  //查询某用户共有多少幸运币
  getUserCoins(query, callback) {
    let user = query.user_id;
    Coin.count({user_id: user})
  },
  //给某个用户新增、减少幸运币
  //1:新增文章：2币
  //2:评论得到悬赏：X币 resource_id
  //3:得到他人的赏：2~10币 resource_id
  //4:新用户 50币
  updateCoin(query,callback) {

    query.coins = coinsNum(query.source, query.coins);
    Coin.create(query)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        console.log(err);
      })
  },
  add(query,callback) {
    let n_query = query;
    n_query.isplus = 1;
    this.updateCoin(n_query,callback);

  },
  reduce(query,callback) {
    let n_query = query;
    n_query.isplus = 0;
    this.updateCoin(n_query,callback);

  },
  //查询某用户的幸运币表
  getUserCoinList() {

  }
}
