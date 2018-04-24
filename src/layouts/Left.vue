<template>
  <div>
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
