<template>
  <div class="container">
    <Header></Header>
    <router-view class="am-u-md-10 am-u-md-offset-1"></router-view>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  import Header from './Header'
  export default {
    name: 'app',
    components:{
      Header,
      VLink
    },
    created(){
    },
    methods:{

    }
  }
</script>


<style scoped>
  header{
    margin-bottom: 0px;
  }
</style>
