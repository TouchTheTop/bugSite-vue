<template>
<div class="clear">
<p>github</p>
<a href="https://github.com/TouchTheTop/bugSite-vue" class='link'><i class="fa fa-github"></i>https://github.com/TouchTheTop/bugSite-vue</a>
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

<style scoped>
.link{
  text-decoration:none;
}
  .fa-github{
    margin-right: 5px;
  }
</style>
