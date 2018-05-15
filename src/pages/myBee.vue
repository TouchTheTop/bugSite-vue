<template>
  <el-main>
    <el-row :gutter="10" type="flex" class="row-bg bee-panel" justify="center">
      <el-col :sm="10" :md="18">
        <div class="bee-panel-nav bee-card">
          <div class="bee-panel-nav-bg"></div>
          <div class="bee-panel-avtar"></div>
          <p class="user-name">一个人</p>
          <div class="bee-panel-bottom">
            <div class="bee-bottom-list">
              <ul>
                <li>关注0人</li>
                <li>文章0篇</li>
                <li>标签0个</li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10" type="flex" class="row-bg bee-panel" justify="center">
      <el-col :sm="10" :md="18">
        <div class="bee-card bee-card-container">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="$router.push('/writeAsk')">发表问题</el-button>
          <el-button type="warning" size="mini" icon="el-icon-edit">发表文章</el-button>
          <el-button type="info" size="mini" icon="el-icon-share">分享主页</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10" type="flex" class="row-bg bee-panel" justify="center">
      <el-col :sm="10" :md="18">
        <div class="bee-card bee-card-container">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的动态" name="0">我的动态</el-tab-pane>
            <el-tab-pane label="我的文章" name="1">我的文章</el-tab-pane>
            <el-tab-pane label="我的悬赏" name="2">我的悬赏</el-tab-pane>
            <el-tab-pane label="幸运币" name="3">幸运币</el-tab-pane>
            <el-tab-pane label="设置" name="3">设置</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

  </el-main>
</template>

<script>
export default {
  data(){
    return{
      activeName:'0',
    }
  },
  methods:{
    handleClick(e){

    }
  }
}
</script>

<style lang="scss" scoped>
  .bee-panel-nav {
  .bee-panel-nav-bg {
    height: 180px;
    background: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1095469752,2222079105&fm=27&gp=0.jpg') center/cover;
  }

  .bee-panel-avtar {
    height: 120px;
    width: 120px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin: auto;
    margin-top: -90px;
    margin-bottom: 12px;
    background: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1095469752,2222079105&fm=27&gp=0.jpg') center/cover;
  }
  .user-name{
    text-align: center;
    margin: 0px;
  }
  .bee-panel-bottom{
    display: flex;
    justify-content: center;
    .bee-bottom-list{
      ul{
        display: flex;
        li{
          margin-right: 15px;
          color: #888;
          font-size: 14px;
        }
      }
    }
  }

  }
</style>
