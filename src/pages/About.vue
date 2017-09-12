<template>
<div class="clear">
<!--     <div class="catalog">
      <ul>
        <li class="active">目录</li>
        <li>框架</li>
        <li>语言</li>
        <li>CSS技巧</li>
        <li>问题</li>
      </ul>
    </div> -->
    <div class="right_content">
      <p>
        项目有vue-cli脚手架构建。
      </p>
      <h3>目录</h3>
      <img src="/img/20170912144337.png" alt="">
      <h3>框架</h3>
      <p>前端框架：vue，jquery(用的不多)</p>
      <p>数据库：mongodb(mongoose插件)</p>
      <p>后台：node.js  </p>
      <p>打包：webpack</p>
      <p>语法：ES6</p>
      <p>Css:sass扩展语言（编译工具：koala）</p>
      <h3>技巧</h3>
      <p>清除浮动：</p>
      <code>
        .clear{
        &:before, &:after { content: ""; display: block; }
        &:after{
        clear:both;
      }
    }
  </code>
  <p>更改placeholder字体颜色：</p>
  <code>
    @mixin placeholder {
    ::-webkit-input-placeholder {@content}
    :-moz-placeholder           {@content}
    ::-moz-placeholder          {@content}
    :-ms-input-placeholder      {@content}
  }
  @include placeholder {
  color: #999999;
}
</code>
</div>
</div>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    }
  }
</script>
