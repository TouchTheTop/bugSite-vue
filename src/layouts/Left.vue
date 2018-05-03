<template>

  <div>
    <div data-am-widget="slider" class="am-slider am-slider-c2" data-am-slider='{&quot;directionNav&quot;:false}' >
      <ul class="am-slides">
        <li>
          <img src="http://s.amazeui.org/media/i/demos/bing-1.jpg">
          <div class="am-slider-desc">远方 有一个地方 那里种有我们的梦想</div>

        </li>
        <li>
          <img src="http://s.amazeui.org/media/i/demos/bing-2.jpg">
          <div class="am-slider-desc">某天 也许会相遇 相遇在这个好地方</div>

        </li>
        <li>
          <img src="http://s.amazeui.org/media/i/demos/bing-3.jpg">
          <div class="am-slider-desc">不要太担心 只因为我相信 终会走过这条遥远的道路</div>

        </li>
        <li>
          <img src="http://s.amazeui.org/media/i/demos/bing-4.jpg">
          <div class="am-slider-desc">OH PARA PARADISE 是否那么重要 你是否那么地遥远</div>

        </li>
      </ul>
    </div>
    <ul class="am-nav">
      <li class="am-nav-header">热门</li>
      <li><a href="#">这个BUG我看怎么解决啊到底？</a></li>
      <li><a href="#">我也不知道啊具体的这个</a></li>
      <li class="am-nav-divider"></li>
      <li><a href="#">等我解决</a></li>
      <li><a href="#">最给力评论</a></li>
    </ul>
    <ActiveList></ActiveList>

  </div>
</template>

<script>
  import  ActiveList from './ActiveList'
export default {
  components:{
    ActiveList
  }
}

</script>
