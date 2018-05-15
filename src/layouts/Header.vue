<template>
  <el-row :gutter="10" type="flex" class="row-bg" justify="center">
    <el-col :sm="10" :md="18">
      <input type="file" ref="fileUpload" @change="upImg">
      <header class="am-topbar">
        <h1 class="am-topbar-brand">
          <a href="#">
            <img src="../assets/images/logo.png" class="logo" alt="必答"></a>
        </h1>
        <ul>
          <li>首页</li>
          <li>榜单</li>
          <li>热门</li>
          <li>我的订阅</li>
          <li>
            <router-link to="/myBee">我的主页</router-link>
          </li>
          <li v-if="!user">
            <router-link to="/login" class="bee-a">登录</router-link>
          </li>
          <li v-if="!user"><a class="bee-a">注册</a></li>
        </ul>
      </header>
    </el-col>
  </el-row>
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
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;

  .logo {
    width: 120px;
  }

  }

  input[type="file"] {
    display: none;
  }

  ul {
    display: flex;

  li {
    padding: 8px 12px;

  a {
    color: #333;
    text-decoration: none;
  }

  .bee-a {
    color: #0f53f6;
  }

  }

  }

</style>
