<template>
  <div class="container">
    <input type="file" ref="fileUpload" @change="upImg">
    <header class="am-topbar">
      <h1 class="am-topbar-brand">
        <a href="#">
          Bee</a>
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
          <v-link href="/login" id="login">
            <button class="am-btn am-btn-primary am-topbar-btn am-btn-sm">登录</button>
          </v-link>
          <button class="am-btn am-btn-warning am-topbar-btn am-btn-sm">注册</button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
export default {
components: {
  VLink
}
}
</script>

<style scoped>
  .am-topbar-brand img {
    width: 120px;
  }

  input[type='file'] {
    display: none;
  }
</style>
