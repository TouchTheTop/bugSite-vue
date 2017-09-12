const code = {
'success':{code:'1'},
'quit':{code:'10001',msg:'退出成功！'},
'noRight':{code:'10002',msg:'无权限！'},

'noUser':{code:'11001',msg:'账号不存在！'},
'pwdError':{code:'11002',msg:'密码错误！'},
'duplUser':{code:'11003',msg:'账号已存在！'},
'nologin':{code:'11004',msg:'未登录！'},

'likeSuccess':{code:'11005',msg:'收藏成功'},
'iflike':{code:'11006',msg:'已收藏'},
'nolike':{code:'11007',msg:'未收藏'},

'addSuccess':{code:'12001',msg:'成功添加一篇文章！'},
'addFail':{code:'err-12002',msg:'未能成功添加文章！'},
'delSuccess':{code:'12003',msg:'成功删除！'},
'upSuccess':{code:'12004',msg:'成功修改！'},
}

module.exports = code