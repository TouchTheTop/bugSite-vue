
<style >
  @import "/style/tagList.css";

</style>

<template>
  <div class="clear">
    <p>我的标签</p>

    <div class="tagbox clear" v-for="item in tags">
        <div class="title">
            <input type="text" :value="item.name" v-focus="isedit" :disabled="!isedit||item._id!=editid" @keyup="setVal">
        </div>
        <div class="content">
            <p>关联Bug：{{item.nums}}个</p>
            <p class="small weak">更新时间：{{item.update_at | fomatTime}}</p>
        </div>
        <div class="ctl_bar">
            <a href="" class="" :data-id="item._id" v-show="!isedit || editid!=item._id" @click.prevent="cedit">修改</a>
            <a href="" class="" :data-id="item._id" v-show="isedit && editid==item._id" @click.prevent="update">完成</a>
            <a href="" class="" @click.prevent="cedit" :data-id="item._id " v-show="isedit && editid==item._id">取消</a>
            <a href="" class="" @click.prevent="deltag($event)" :data-id="item._id" v-show="!isedit || editid!=item._id">删除</a>
        </div>
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
            name:''
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
    setVal(e){
        this.name = e.currentTarget.value;
    },
    cedit(e){
        // if(!this.editid)
        this.editid = e.currentTarget.dataset.id;
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
