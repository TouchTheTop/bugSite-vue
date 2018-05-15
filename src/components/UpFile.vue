<template>
  <div>
    <button type="button" class="am-btn am-btn-default am-btn-sm">
      <i class="am-icon-cloud-upload"></i> 选择要上传的文件
    </button>
    <input type="file" multiple @change="upImg">
    <div class="bee-imgbox">
      <div class="bee-imgbox-dragedimg" v-for="(item,i) in lb_img" :key="i"
           :style="{background:'url('+item+') center/cover'}">
        <i class="fa fa-close"></i>
        <div class="bee-mask">预览</div>
        <img class="coner" src="../assets/images/coner.png" alt="coner">
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
          lb_img: []
      }
    },
    watch:{
      lb_img(){
        this.$emit('setLbImg',this.lb_img)
      }
    },
    methods: {
      //上传图片
      upImg(e) {
        var files = e.target.files, that = this;

        var oFReader = new FileReader();

        that.$FileWorker(files[0], e.target.value, function (res) {

          that.lb_img.push('https://' + res.Location);
          e.target.value = '';
        });
      },
    }
  }
</script>

<style lang="scss" scoped>

  input[type='file'] {
    opacity: 0;
    width: 163px;
    margin-top: -32px;
    height: 32px;
    margin-left: 52px;
  }
</style>
