<template>
  <div class="content white_box">
    <div class="title">
      <h4>49条评论</h4>
      <div class="sort">
        <span>按时间排序</span>
      </div>
    </div>
    <div class="big_box">
  
      <div class="bee_zan">
        <i class="fa fa-sort-asc primary"></i>
        <span>23</span>
        <i class="fa fa-caret-down info"></i>
      </div>
      <div class="box">
        <div class="title_a">
          <div class="avtar" style="background:url('/img/logo.png') center/cover;">
          </div>
          <div class="title_s_box">
            <div class="title_s">fweffdfd</div>
            <div class="timer">2018.2.12 16:22:03</div>
          </div>
  
        </div>
        <div class="comments">
          sdfjwoefie joml
        </div>
      </div>
    </div>
        <div class="user_comment">
          <a href="#" class="primary">张三</a>:
          <a href="#" class="primary">@李四</a> 其实这样也挺好的哈！
          <div class="timer_c">
            <span>2018.02.13 12:22:02</span>
            <span class="call_comment"><i class="fa fa-comment-o"></i>回复</span>
          </div>
        </div>
  
  
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .content {
    margin-top: 30px;
    .title {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-between;
      margin-bottom: 15px;
      h4 {
        display: inline-block;
        margin: 0px;
        color: #333;
      }
      .sort {
        font-size: 14px;
        color: #666;
      }
    }
    .big_box {
      display: flex;
      flex-direction: row;
      align-content: center;
      .bee_zan {
        width: 50px;
        position: relative;
        margin-right: 12px;
        span {
          display: block;
          position: absolute;
          margin: auto;
          top: 50%;
          transform: translateY(-50%);
          line-height: 16px;
          width: 100%;
          text-align: center;
          font-size: 23px;
        }
        i {
          font-size: 28px;
          margin: auto;
          display: block;
          text-align: center;
          height: 18px;
        }
        i.fa-caret-down {
          margin-top: 42px;
        }
      }
    }
    .user_comment {
      font-size: 14px;
      padding-left: 12px;
      border-left: 1px solid #ddd;
      margin-left: 62px;
      .timer_c{
        color:#999;
        font-size: 12px;
        margin-top: 4px;
        span{
          margin-right: 8px;
        }
        .call_comment{
          i{
            margin-left: 2px;
          }
          &:hover{
            color: #000;
            cursor: default;
          }
        }
      }
    }
    .comments {
      padding: 10px 0px;
      font-size: 16px;
    }
    .title_s_box {
      line-height: 20px;
      padding-top: 3px;
      margin-left: 8px;
      .title_s {
        font-size: 16px;
        color: #333;
      }
      .timer {
        font-size: 12px;
        color: #999;
      }
    }
    .title_a {
      display: flex;
      flex-direction: row;
      align-content: center;
      .avtar {
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #ddd;
      }
    }
  }
</style>
