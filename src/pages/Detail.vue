<template>
  <div class="bee-main">

    <form>
      <div class="detail">
        <div class="types_choose">
          <a href="#" :id="item._id" :data-name="item.name" v-for="item in tag" @click.prevent="tagIt($event)" :class="tags.indexOf(item._id)>=0?'active':''" v-show="(!isEdit&&tags.indexOf(item._id)>=0)||isEdit">{{item.name}}</a>
          <input type="text" @blur="newtag" v-show="tagadding" placeholder="标签" v-focus='tagadding'>
          <a href="#"  class="fa fa-plus-circle add"  @click.prevent="caddtag" v-show="isEdit"></a>
        </div>
        <input type="hidden" :value="data._id" name="id">
        <input type="hidden" :value="content" name="asset">
        <p v-show="!isEdit" class="title">{{data.title}}</p>
        <input v-show="isEdit" type="text" name="title" class="title" placeholder="请输入标题"   v-model="title">
        <div class="content" id="editor" v-show="isEdit">

        </div>
        <div class="content" id="editor_box">

        </div>
      </div>
      <div class="submit" v-show="isEdit">
        <button type="submit" @click.prevent="edit">提交</button>
      </div>
    </form>

    <div class="ctl" v-show="!isEdit">
      <a class="butctl" @click="likeit($event)" :id="data._id" :disabled="islike" ref="likebox">
        <i class="fa fa-heart"></i>
      </a>
      <a class="butctl weixin" :id="data._id" ref="likebox">
        <i class="fa fa-weixin"></i>
      </a>
    </div>

    <Conment-Box></Conment-Box>
    <Conments></Conments>
  </div>
</template>
<style scoped>
input.title{
    width:100%;
    height:40px;
    border:1px solid #ddd;
    border-radius:8px 8px 0px 0px;
    padding:0px 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

</style>
<script>
  import MainLayout from '../layouts/Main.vue'
  import ConmentBox from '../components/ConmentBox.vue'
  import Conments from '../components/Conments.vue'
  import E from 'wangeditor'
  import toastr from 'toastr'
  export default {
    created() {
      if(this.$router.history.current.name == 'edit'){
        this.isEdit = true;
      }

      this.getDetail(this.$route.params.id);

    },
    data(){
      return {
        isEdit:false,
        data:'',
        content:'',
        title:'',
        islike:false,
        tag:['JAVA','前端','Android'],
        tagadding:false,
        activeid:[],
        tags:[]
      }
    },
    components: {
      MainLayout,
      ConmentBox,
      Conments
    },
    methods:{
      getTags:function(){
        this.$http.post('/api/tag')
        .then(res => {
          this.tag = res.data;
        })
        .catch(e => {
         console.log(e);
       });
      },
      caddtag(){
        this.tagadding = !this.tagadding;
      },
      newtag(e){
        var tagname = e.currentTarget.value;
        if(tagname){
          this.$http.post('/api/newtag',{
            name:tagname
          })
          .then(res => {
            if(res.data.code){
              this.getTags();
              this.caddtag();
            }
          })
          .catch(e => {

          })
        }else{
          this.caddtag();
        }
      },
      edit(){
        this.$http.post('/api/edit', {
          id:this.data._id,
          title:this.title,
          asset:this.content,
          tag:this.activeid,
          img:$('#editor').find('img').eq(0).attr('src')
        }).then((res) => {
                if(res.data.code==1){
                window.location.reload();
                this.$router.push(`/doc`);
                }

              }, (e) => {
                // error callback
              });
      },
      tagIt(e){
        if(this.activeid.length<=3){
          var id =  e.currentTarget.id;
          var name = e.currentTarget.dataset.name;
          var obj = {tagid:id,name:name}

          var index = -1;
          var activearr = this.activeid;
          this.activeid.forEach(function(val,i,arr){
            if(arr[i].tagid==id){
              index = i;
            }
          })
          if(index<0)
            {this.activeid.push(obj);this.tags.push(id);}
          else
            {this.activeid.splice(index,1);this.tags.splice(index,1);}
        }
      },
      getDetail(id){
        this.$http.get('/api/doc/'+id)
        .then(res => {
          this.data = res.data;
          this.title = this.data.title;
          this.content = this.data.asset;
           $('#editor_box').html(this.content );
          this.init();
          this.isliked(this.data._id);
          this.browse();
          this.getTags();
          for(let i = 0; i<res.data.tag.length;i++){
            this.tags.push(res.data.tag[i].tagid);
            var obj = {
              name:res.data.tag[i].name,
              tagid:res.data.tag[i].tagid
            }
            this.activeid.push(obj);


            console.log( this.activeid)
          }

        })
        .catch(e => {
          console.log(e)
        })
      },
      browse(){
        this.$http.post('/api/browse',{
          doc_id:this.data._id
        })
        .then(res => {
        })
        .catch(err => {
          this.toastr.error(`${err.message}`, 'ERROR!')
        })
      },
      init(){
        var editor = new E('#editor');
        var self = this;
        editor.customConfig.onchange = function (html) {
          self.content = html;
        }
        editor.create();

        editor.txt.html(this.data.asset);

        if(!this.isEdit)
          editor.$textElem.attr('contenteditable', false)
      },
      // 判断该文章是否已被当前用户收藏
      isliked(id){
        this.$http.post('/api/iflike',{
          doc_id:id
        })
        .then(res => {
          if(res.data.code == "11006"){
            this.islike = true;
            this.$refs.likebox.classList.add('liked');
          }


        })
        .catch(e => {
          console.log(e);
        })
      },
      likeit(e){
        var id = e.currentTarget.id;
        if(!this.islike)
          this.$http.post('/api/like',{
            doc_id:id
          })
        .then(res => {console.log(res.data);
          if(res.data.code == '11005')
            {   this.$refs.likebox.classList.add('like');toastr.success(res.data.msg)}
          else
            toastr.error(res.data.msg)

        })
        .catch(e => {
          console.log(e);
        })

      }
    },
    mounted() {

    }
  }
</script>
