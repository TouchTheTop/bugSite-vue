
// var COS = require('cos-nodejs-sdk-v5');
var md5 = require('md5');
// 创建实例
var cos = new COS({
    AppId: '1253736812',
    SecretId: 'AKIDe9WgcLwAF7nFTVwvISPDqIXZNyMXuEl5',
    SecretKey: 'FH5g4EAtOgl04tTowueATXMwIQK0RdaH'
});
// 分片上传


var UpFile = function (file, path, callback) {
  
    let name = md5(new Date() + file.name);
    var parames = {
        Bucket: 'beewal-1253736812',
        Region: 'ap-guangzhou',
        Key: name, //文件名
        Body: file
    };
    console.log(cos);
    try {
        cos.sliceUploadFile(parames, function(err, data) {

               if(err){
                console.log(err);
               }else{
                   console.log(data);
               }
        });
    } catch (error) {
        console.log(error);
    }

}

module.exports = UpFile;