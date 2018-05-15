<template>
  <div class="container">
    <input type="file" ref="fileUpload" @change="upImg">
    <header class="am-topbar">
      <h1 class="am-topbar-brand">
        <a href="#">
          <img src="../assets/images/logo.png" alt="必答"></a>
      </h1>

      <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only"
              data-am-collapse="{target: '#doc-topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span
        class="am-icon-bars"></span></button>

      <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">
        <ul class="am-nav am-nav-pills am-topbar-nav">
          <li class="am-active"><a href="#">首页</a></li>
          <li><a href="#">榜单</a></li>
          <li><a href="#">话题</a></li>
          <li><a href="#">数据</a></li>
        </ul>

        <form class="am-topbar-form am-topbar-left am-form-inline" role="search">
          <div class="am-form-group">
            <input type="text" class="am-form-field am-input-sm" placeholder="搜索">
          </div>
        </form>

        <div class="am-topbar-right">

          <!--<ul class="bee-nav">-->
            <!--<li class="bee-active"><a href="#">首页</a></li>-->
            <!--<li><a href="#">开始使用</a></li>-->
            <!--<li><a href="#">按需定制</a></li>-->
          <!--</ul>-->

          <div class="am-dropdown" data-am-dropdown>
            <button class="am-dropdown-toggle bee-no-button" data-am-dropdown-toggle v-if="user">
              <img src="../assets/images/bee.png" alt="bee">
              {{user.user_name?user.user_name:'小蜜蜂'}}
              <span class="am-icon-caret-down"></span></button>
            <ul class="am-dropdown-content">
              <li class="am-dropdown-header">账号：{{user.account}}</li>
              <li><router-link to="/writeAsk"><i class="fa fa-question-circle"></i>我要问</router-link></li>
              <li><router-link to="/mytag" href="#"><i class="fa fa-tag"></i>管理标签</router-link></li>
              <li><router-link to="/mybug" href="#"><i class="fa fa-book"></i>文章管理</router-link></li>
              <li><a href="#">更多...</a></li>
              <li class="am-divider"></li>
              <li><a href="#">退出</a></li>
            </ul>
          </div>

          <router-link to="/login" id="login" v-if="!user">
            <button class="am-btn am-btn-primary am-topbar-btn am-btn-sm">登录</button>
          </router-link>
          <button v-if="!user" class="am-btn am-btn-warning am-topbar-btn am-btn-sm">注册</button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: '',
        isexpend: false
      }
    },
    created() {

      this.getUser();
    },
    methods: {
      //更换图片
      openFile() {
        this.$refs.fileUpload.click();
      },
      //上传图片
      upImg(e) {
        var files = e.target.files, that = this;

        var oFReader = new FileReader();

        that.$FileWorker(files[0], e.target.value, function (res) {
          console.log(res);
        });
      },
      getPath: function (obj) {

        if (obj) {

          if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();

            return document.selection.createRange().text;

          }


          else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {

            if (obj.files) {

              return obj.files.item(0).getAsDataURL();
            }

            return obj.value;

          }

          return obj.value;

        }

      },


      getUser() {
        this.$http.get('/api/login/user')
          .then(res => {
            if (res.data)
              this.user = res.data;
          })
          .catch(e => {
            console.log(e);
          })
      },
      extend() {
        this.isexpend = !this.isexpend;
      },
      quit() {
        this.$http.get('/api/login/quit')
          .then(res => {
            window.location.reload();
            this.$router.push(`/`)
            toastr.success(res.data.msg);
          })
          .catch(e => {
            console.log(e);
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .am-topbar-brand img {
    width: 60px;
  }

  input[type='file'] {
    display: none;
  }

  .bee-nav{
    display:flex;
    display: inline-block;
    margin-bottom: 0px;
    height: 40px;
    vertical-align: sub;
    margin-top: 9px;
    li{
      display: inline-block;
      padding: 5px 12px;
      font-size: 14px;
    }
  }

  .am-dropdown-content li i{
    margin-right: 4px;
    &:nth-child(1){
      color: #5671b5;
     }
  &:nth-child(2){
     color: #5d7aea;
   }
  &:nth-child(3){
     color: #0b52f6;
   }
  }

</style>
