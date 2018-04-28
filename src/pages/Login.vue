<template>
  <div class="login_box">
    <div class="form-bg">
        <form class='clear'>
            <div class="list_way">
                <div class="left_tab" @click="checkTab(0)" :class="isWeixin?'':'active'">账号登陆</div>
                <div class="right_tab" @click="checkTab(1)" :class="isWeixin?'active':''">微信登陆</div>
            </div>
            <p><input type="text" name="account" placeholder="邮箱/手机号" v-model="account"></p>
            <p><input type="password" name="pwd" placeholder="密码" v-model="pwd"></p>
            <label for="remember">
              <input type="checkbox" id="remember" value="remember" ref="remember">
              <span>七天内记住我</span>
          </label>
          <label class="register" v-show="islogin">
              <span>还没有账号？<a @click.prevent="changeStatus">注册</a></span>
          </label>

          <label class="register" v-show="!islogin">
              <span>已经有账号？<a @click.prevent="changeStatus">登录</a></span>
          </label>

          <button type="submit" class="main_btn" v-show="islogin" @click.submit.prevent='login'>登录</button>
          <button type="submit" v-show="!islogin" @click.submit.prevent='registe'>注册</button>

          <!-- <button type="button" class="second_btn" @click.submit.prevent="showQcode">微信登陆</button> -->
      </form></div>
      <p class="forgot">忘记密码? <a href="">点击此处重置密码.</a></p>
  </div>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import toastr from 'toastr'
  export default {
    data(){
        return {
            account:'',
            pwd:'',
            islogin:true,
            isWeixin:false //是否是微信登陆
        }
    },
    methods:{
        login(){
            let account = this.account;
            let pwd = this.pwd;
            if(!account||!pwd){
               toastr.error('请输入账号、密码!')
           }else{
            this.$http.post('/api/login',{
                account:account,
                pwd:pwd,
                remember:$(this.$refs.remember).is(':checked')
            })
            .then(res => {
                if(res.data.code == 1)
                    {toastr.success('登录成功!');window.location.reload();this.$router.push(`/doc`)}
                else
                  toastr.error(res.data.msg)
          })
            .catch(e => {
                console.log(e)
            })

        }
    },
    //切换登陆方式
    checkTab(isOrigin){
        this.isWeixin = isOrigin;
    },
      //展示二维码
      showQcode(){

      },
    changeStatus(){
        this.islogin = !this.islogin;
    },
    registe(){
        let account = this.account;
        let pwd = this.pwd;
        if(!account||!pwd){
           toastr.error('请输入账号、密码!')
       }else{
        this.$http.post('/api/login/register',{
            account:account,
            pwd:pwd
        })
        .then(res => {
            if(res.data.code == 1)
                toastr.success('注册成功!赶紧登录吧！')
            else
              toastr.error(res.data.msg)
      })
        .catch(e => {
            console.log(e)
        })

    }
}
},
components: {
  MainLayout
}
}
</script>

<style lang="scss" scoped>
  .login_box{
    background: url('../assets/login_bg.png') center/cover;
  }


$main-color:#af9016;
.list_way{
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding:16px 0px 0px 0px;
    margin-bottom: 24px;
    div{
        flex: 1;
        text-align: center;
        padding:0px;
        font-size: 14px;
        &.active{
            color:$main-color;
        }
        &:hover{
            cursor: pointer;
        }
    }
    .right_tab{
        border-left: 1px solid #ddd;
    }

}
    .form-bg {
        width: 370px;
        height: auto;
        -moz-border-radius:9px;
        -webkit-border-radius:9px;
        border-radius:9px;
        margin: 90px auto 0;
        background: url(/img/form-bg.png) top left;
        padding: 8px 0 0 8px;
    }
    .form-bg form .register{
        margin-left:115px;
    }

    .form-bg form .register a{
      color: #083bea;
  }

  .form-bg form {
    width: 360px;
    height: auto;
    background: #fff url(/img/bg_form.jpg) repeat-x top left;
    -moz-border-radius:4px;
    -webkit-border-radius:4px;
    border-radius:4px;
    -moz-box-shadow:0px 1px 3px 2px rgba(0,0,0,0.1);
    -webkit-box-shadow:0px 1px 3px 2px rgba(0,0,0,0.1);
    box-shadow:0px 1px 3px 2px rgba(0,0,0,0.1);
}

.clear:after{
    content: '';
    display: block;
    clear: both;
}
.form-bg form h2 {
    font-size: 14px;
    font-weight: bold;
    color: #555555;
    font-family:"HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-shadow: 0 1px 0 #fff;
    filter: dropshadow(color=#fff, offx=0, offy=1);
    line-height: 45px;
    margin-bottom: 24px;
    margin-left:25px;
}

input[type="text"], input[type="password"]{
    box-shadow: 0px 0px 0px 4px #f2f5f7;
    width: 290px;
    height: 33px;

    padding: 0 10px 0 10px;
    margin: 0 auto;
    color: #aeaeae;
    border: 1px solid #bec2c4;
}

input[type="text"]:focus, input[type="password"]:focus{
    box-shadow: 0px 0px 0px 4px #e0f1fc;
    border:1px solid #7dc6dd;
}

input[type="checkbox"] {
    vertical-align: middle;
}

label {
    display: inline;
    margin-left: 24px;
    vertical-align: middle;
    font-size:12px;
}
button {
    width: 100px;
    height: 32px;
    border: 0px;
    margin: 8px 0px;
    float: right;
    /* color: yellowgreen; */
    background: #0c7ad8;
    color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
}
button.main_btn{
  margin-right: 25px;

}
button.second_btn{
  margin-right: 15px;
  background-color: #3eb94e;
}

p {margin: 0 0 20px;text-align:center;}
p.forgot {
    text-align: center;
    margin-top: 10px;
    color: #555;
    font-size: 12px;
    font-weight: bold;
}
button:hover {
    background: #9dd628;
    cursor: pointer;
}


</style>
