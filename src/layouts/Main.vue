<template>
  <div class="container">
    <Header></Header>
    <div class="am-g am-u-md-10 am-u-md-offset-1" >
      <Nav-left class="am-u-md-3 "></Nav-left>
    <router-view class="am-u-md-9"></router-view>
    </div>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  import toastr from 'toastr'
  import Header from './Header'
  import NavLeft from './Left'
  export default {
    name: 'app',
    data(){
      return {
        user:'',
        isexpend:false
      }
    },
    components:{
      NavLeft,
      Header,
      VLink
    },
    created(){

      this.getUser();
    },
    methods:{
      //更换图片
      openFile(){
        this.$refs.fileUpload.click();
      },
      //上传图片
      upImg(e){
        var files = e.target.files,that = this;

            var oFReader = new FileReader();

                that.$FileWorker(files[0],e.target.value,function(res) {
          console.log(res);
        });
      },
getPath:function (obj)

{

  if(obj)

    {

    if (window.navigator.userAgent.indexOf("MSIE")>=1)
      {
        obj.select();

      return document.selection.createRange().text;

      }


    else if(window.navigator.userAgent.indexOf("Firefox")>=1)

      {

      if(obj.files)
        {

        return obj.files.item(0).getAsDataURL();
        }

      return obj.value;

      }

    return obj.value;

    }

},


      getUser(){
        this.$http.get('/api/login/user')
        .then(res => {
          if(res.data)
          this.user = res.data;
        })
        .catch(e => {
          console.log(e);
        })
      },
      extend(){
          this.isexpend = !this.isexpend;
      },
      quit(){
        this.$http.get('/api/login/quit')
        .then(res => {
           window.location.reload();
           this.$router.push(`/`)
           toastr.success(res.data.msg);
        })
        .catch(e => {
          console.log(e);
        })
      }
    }
  }
</script>

<style scoped>

</style>
