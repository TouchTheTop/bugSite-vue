<template>
  <div>
    <p>添加文章 </p>
    <div class="types_choose">
      <a href="#" :id="item._id" :data-name="item.name" v-for="item in tag" @click.prevent="tagIt($event)" :class="tags.indexOf(item._id)>=0?'active':''">{{item.name}}</a>
      <input type="text" @blur="newtag" v-show="tagadding" placeholder="标签" v-focus='tagadding'>
      <a href="#"  class="fa fa-plus-circle add"  @click.prevent="caddtag"></a>
    </div>
    <div class="add content" ref="addbox">
      <form >
        <input type="text" name="title" class="title" placeholder="请输入标题"  v-model="title">
        <div id="editorElem" class="asset" @paste="onPasteEvent($event)">

        </div>
        <input type="hidden" name="asset" :value="editorContent">
        <div class="submit">
          <button type="submit" @click.prevent="add">提交</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import toastr from 'toastr'
  import E from 'wangeditor'
  export default {
    data(){
      return {
        editorContent: '',
        editor:'',
        title:'',
        asset:'',
        tag:['JAVA','前端','Android'],
        tagadding:false,
        activeid:[],
        tags:[],
        content:''
      }
    },
    created(){
      this.getTags();
    },

    mounted() {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html;
        this.content = editor.txt.text().slice(0,40);
      }
      editor.create();
      this.editor = editor;

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
      add: function() {
        this.$http.post('/api/doc/add', {
          title:this.title,
          asset:this.editorContent,
          content:this.content,
          tag:this.activeid,
          img:$('#editorElem').find('img').eq(0).attr('src')
        }).then((response) => {
                // success callback
                window.location.reload();
                this.$router.push(`/doc`)
                toastr.success(res.data.msg);
              }, (response) => {
                // error callback
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
      onPasteEvent(e){

       var clipboard = e.clipboardData;
       for(var i=0,len=clipboard.items.length; i<len; i++) {
        if(clipboard.items[i].kind == 'file' || clipboard.items[i].type.indexOf('image') > -1) {
          var imageFile = clipboard.items[i].getAsFile();
          var form = new FormData();
          form.append('t', 'ajax-uploadpic');
          form.append('file', imageFile);
          var callback = G.uploadpicCallback || function(type, data){};
          let config = {
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
          };  //添加请求头
          this.$http.post('/api/upimg',form,config)
          .then(res=>{
            console.log(res.data);
            this.editor.txt.append('<img src="'+res.data.path.split('static\\')[1]+'"></img>')
          })
          .catch(e => {
            console.log(e);
          })
          // $.ajax({
          //   url: '/api/upimg',
          //   type: "POST",
          //   data: form,
          //   processData: false,
          //   contentType: false,
          //   beforeSend: function() {
          //     callback('before');
          //   },
          //   error: function() {
          //     callback('error');
          //   },
          //   success: function(url) {
          //     callback('success', url);
          //   }
          // })
          e.preventDefault();
        }
      }
    }
  },
  components: {
    MainLayout
  }
}
</script>
