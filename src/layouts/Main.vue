<template>
    <router-view></router-view>
</template>

<script>
  import VLink from '../components/VLink.vue'
  export default {
    name: 'app',
    components:{
      VLink
    }
  }
</script>

<style scoped>
  header{
    margin-bottom: 0px;
  }
</style>
