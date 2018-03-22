<template>
  <div class="content">
    <div class="avtar" style="background:url('/img/logo.png') center/cover;">
    </div>
    <div class="container">
      <div class="call_content" v-if="call_content">
        {{call_content}}
      </div>
      <textarea :class="call_content?'called':''" placeholder="写下你的评论......"></textarea>
      <div class="bottom_b">
        <button class="text_but">取消</button>
        <button type="success" class="btn_radius">发送</button>
  
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        call_content:' 张三: @李四 其实这样也挺好的哈！'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: row;
    margin-top: 25px;
    .avtar {
      min-width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #ddd;
    }
    .container {
      margin-left: 15px;
      width: 100%;
      position: relative;
      .call_content {
        position: absolute;
        font-size: 12px;
        padding: 8px;
        /* background: red; */
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        color: #666;
      }
      textarea {
        width: 100%;
        height: 100px;
        &.called{
          padding-top:38px;
          height: 120px;
        }
      }
      .bottom_b {
        text-align: right;
      }
    }
  }
</style>
