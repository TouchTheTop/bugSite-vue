<template>
  <div class="container">
    
    <div class="user">
       <img src="img/logo.png" alt="" class="logo">
     <v-link href="/login" id="login" v-show="!user">登录</v-link>
     <a  v-show="user" class="imguser" @click="extend">
      <img src="img/tu1.jpg" alt="" class="mini">
      <a class="fa fa-sort-desc after"></a>
      <a class='after username'>{{user.account}}</a>
      <div class="userbox" v-show="isexpend">
        <img src="img/tu1.jpg" alt="">
        <div class="nickname">Christine</div>
        <div class="account">账号：{{user.account}}</div>
        <div class="btn-group margin-bottom-2x" role="group">
        <button type="button" class="btn btn-default"><i class="fa fa-user"></i> 个人</button>
          <button type="button" class="btn btn-default" @click="quit"><i class="fa fa-sign-out"></i> 退出</button>
        </div>
      </div>
    </a>
    <v-link href="/add" v-show="user"><i class="fa fa-leaf"></i> 记录BUG</v-link>
    <v-link href="/mytag" v-show="user"><i class="fa fa-bookmark"></i> 我的标签</v-link>
    <v-link href="/mybug" v-show="user"><i class="fa fa-bug"></i> 我的BUG</v-link>
    <v-link href="/mybug" v-show="user"><i class="fa fa-at"></i> 关注</v-link>
    <v-link href="/mybug" v-show="user" class="on"><i class="fa fa-bell"></i> 消息<span>2</span></v-link>
<!--     <v-link href="/myCollect" v-show="user"><i class="fa fa-heart"></i> 我的收藏</v-link> -->
  </div>
  <ul class="nav-bar">

    <li>
      <v-link href="/doc" >首页</v-link>
<!--         <ul class="second-level-menu">
          <li>新增</li>
        </ul> -->
      </li>
      <li>
        <v-link href="/about" >关于</v-link>
      </li>
      <li>
        <v-link href="/github">github</v-link>
      </li>

    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  import toastr from 'toastr'
  export default {
    name: 'app',
    data(){
      return {
        user:'',
        isexpend:false
      }
    },
    created(){

      this.getUser();
    },
    methods:{
      getUser(){
        this.$http.get('/api/login/user')
        .then(res => {
          if(res.data)
          this.user = res.data;
        })
        .catch(e => {
          console.log(e);
        })
      },
      extend(){
          this.isexpend = !this.isexpend;
      },
      quit(){
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
    },
    components: {
      VLink
    }
  }
</script>

<style scoped>
  .container {
    max-width: 70%;
    margin: 0 auto;
    padding: 15px 30px;
    padding-top: 0px;
    background: #f9f7f5;
  }
  .logo{
    width: 100px;
  }
</style>
