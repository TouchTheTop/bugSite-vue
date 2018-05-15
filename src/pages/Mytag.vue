

<template>
  <div class="clear">
    <!--<p>我的标签</p>-->
    <h2 class="bee-page-title"><i class="fa fa-tag"></i>我的标签</h2>
    <hr data-am-widget="divider" style="" class="am-divider am-divider-default" />

    <div class="tagbox clear" v-for="item in tags" :id="item._id"  v-on:mouseenter="showCtl" v-on:mouseleave="showTag=''">
        <div class="title">
            <input type="text" :value="item.name" v-focus="isedit" :disabled="!isedit||item._id!=editid" @keyup="setVal">
        </div>
        <div class="content">
            <p>关联Bug：{{item.nums}}个</p>
            <p class="small weak">更新时间：{{item.update_at | fomatTime}}</p>
        </div>
        <transition name="fade" >
        <div class="ctl_bar" v-if="showTag==item._id">
            <a href="" class="" :data-id="item._id" :data-name="item.name" v-show="!isedit || editid!=item._id" @click.prevent="cedit">修改</a>
            <a href="" class="" :data-id="item._id" v-show="isedit && editid==item._id" @click.prevent="update">完成</a>
            <a href="" class="" @click.prevent="cedit" :data-id="item._id " v-show="isedit && editid==item._id">取消</a>
            <a href="" class="" @click.prevent="deltag($event)" :data-id="item._id" v-show="!isedit || editid!=item._id">删除</a>
        </div>
        </transition>
    </div>

</div>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import toastr from 'toastr'
  export default {
    data(){
        return {
            tags:[],
            isedit:false,
            editid:'',
            name:'',
            showTag:''
        }
    },
    components: {
      MainLayout
  },
  created(){
    this.getUserTag();
},
methods:{
    getUserTag(){
        this.$http.get('/api/tag/byuser')
        .then(res => {
            this.tags = res.data;
        })
        .catch(e => {
            console.log(e);
        })
    },
    showCtl(e){
        this.showTag = e.currentTarget.id;
    },
    setVal(e){
        this.name = e.currentTarget.value;
    },
    cedit(e){
        // if(!this.editid)
        this.editid = e.currentTarget.dataset.id;
        this.name = e.currentTarget.dataset.name;
        this.isedit =  !this.isedit;
    },
    deltag(e){
        this.$http.post('/api/tag/delete',{
            id:e.currentTarget.dataset.id
        })
        .then(res => {
            this.getUserTag();
            toastr.success(res.data.msg)
        })
        .catch(e => {
            console.log(e);
        })
    },
    update(){
        this.$http.post('/api/tag/update',{
            id:this.editid,
            name:this.name
        })
        .then(res => {
            this.getUserTag();
             this.isedit = false;
             this.editid = '';
             this.name = '';
            toastr.success(res.data.msg)
        })
        .catch(e => {
            console.log(e);
        })
    }
},
filters:{
    fomatTime:function(value){
      return new dateUtil().exchange(value);
  }
},
}
</script>

<style lang="scss" scoped>
  $main-color-3:#6e91f7;
  $main-color-2:#1354f6;

  .tagbox{
    width: 21%;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    float:left;
    margin:2%;
    position:relative;
    border-radius: 6px;
  .title{
    text-align: center;
    padding: 8px 0px;

  input{
    width: 90%;
    border-radius: 5px;
    border: 0;
    height: 30px;
    text-align: center;
    background: $main-color-3;
    color: #fff;
    font-size: 16px;
  }
  }
  .content{
    padding:5px 15px;
    background:#fff;
    color:#555;
    border-radius: 6px;
  }
  .ctl_bar{
    position:absolute;
    bottom:0;
    width:100%;
    background: rgba(64, 62, 62, 0.76);
    overflow: auto;
    border-radius: 0px 0px 6px 6px;
  a{
    display: inline-block;
    width: 50%;
    text-align: center;
    float:left;
    padding: 5px 0px;
    text-decoration:none;
    color: #cecece;
    font-size:16px;
    position: relative;
  &:first-child{
  &:after{
     content: '';
     width: 1px;
     height: 20px;
     background: #d3d3df;
     position: absolute;
     right: 0;
     top: 6px;
   }
  }
  &:hover{
    color: #fff;
   }
  }
  a.old{
    background: #9e9e9e;;
  }
  a.warn{
    background:#ff6060;
  }
  }

  }

</style>
