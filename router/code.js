const code = {
    'success': { code: 0 },
    'quit': { code: 0, msg: '退出成功！' },
    'noRight': { code: '10002', msg: '无权限！' },
    'noAuthorize' : { code: '10003', msg: '登录失效！' },

    'noUser': { code: '11001', msg: '账号不存在！' },
    'pwdError': { code: '11002', msg: '密码错误！' },
    'duplUser': { code: '11003', msg: '账号已存在！' },
    'nologin': { code: '11004', msg: '未登录！' },

    'likeSuccess': { code: 0, msg: '收藏成功' },
    'iflike': { code: 0, msg: '已收藏' },
    'nolike': { code: '11007', msg: '未收藏' },

    'addSuccess': { code: 0, msg: '成功添加一篇文章！' },
    'addFail': { code: 'err-12002', msg: '未能成功添加文章！' },
    'delSuccess': { code: 0, msg: '成功删除！' },
    'upSuccess': { code: 0, msg: '成功修改！' },
}

function msg(errcode,msg) {
  return {
    errcode:errcode,
    msg:msg || ''
  }
}

module.exports = {
  code:code,
  msg :msg
}
