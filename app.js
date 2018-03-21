const pkg = require('./package')
const config = require('./config/db')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./router/index')
const login = require('./router/login')
const tag = require('./router/tag')
const movie = require('./router/movie')
const doc = require('./router/doc')

const cookieParser = require('cookie-parser')
const session = require('express-session')

mongoose.connect(config.mongodb,{useMongoClient: true})
mongoose.Promise = global.Promise

const app = express()
const port = process.env.PORT || 3000

app.use(cookieParser());
app.use(session({
    secret:'18720972591',
    cookie:{maxAge:login.maxage},
    resave:true,  //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存
    saveUninitialized:true //:初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(favicon(__dirname + '/src/assets/favicon.ico'))
app.use(express.static(__dirname + '/dist'))
app.use('/',index)
app.use('/api',doc)
app.use('/api/login',login.router)
app.use('/api/tag',tag)

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})

module.exports = app
