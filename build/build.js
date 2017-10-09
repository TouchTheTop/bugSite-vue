// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)
shell.config.silent = false

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
    ))
})




(function(){
  var l = parseInt(Math.sqrt(16)); //矩阵
  var arr = [[],[],[],[]];
  var key = 1;
  var lastkey = 0;
  for(var i = 0;i<l;i++){

    for(var j = 0;j<l;j++){
      // if(!arr[i][j]){
      //   arr[i][j] = key;
      //   key++;
      // }
      if(lastkey==l-1&&arr[i][lastkey]){
        continue;
      }
      if(i<l-1&&i){
        arr[i][lastkey] = key;
        key++;
        continue;
      }else{
        lastkey = j;
      }
      arr[i][lastkey] = key;
      key++;
    }

  }
  arr[l-1].reverse();  //最后一行倒序
  console.log(arr);

})()