
<template>
  <div>

    <h2 class="bee-page-title"><i class="fa fa-book"></i>我的文章</h2>
    <hr data-am-widget="divider" style="" class="am-divider am-divider-default" />

    <div class="ctl_bar">
     <div class="search-animate">
      <i class="fa fa-search " aria-hidden="true"></i>
      <input type="text" placeholder="请输入文章标题"  @input="search($event)" />
    </div>
  </div>
  <ul class="list">
    <li v-for="item in data">
      <a >
          <div class="bar_list" :id="item._id" @click="showDetail(item._id)">
            {{item.title}}
            <div class="ctl_cicle_box">
              <button class="warning" @click="edit($event)" :id="item._id">修改</button>
              <button class="delete"  @click="remove(item._id)" :id="item._id">删除</button>
            </div>
          </div>
      </a>
    </li>
  </ul>
  <div class="cssload-container" v-show="loadding">
    <div class="cssload-loading"><i></i><i></i></div>
  </div>
  <div class="nomore">
    <i class="fa fa-hand-scissors-o"></i>所有的文章全在这了
  </div>
</div>
</template>

<script>
  import MainLayout from '../layouts/Main.vue';
  export default {
   data () {
    return {
      data:[],
      allheight:'',
      page:1,
      pageSize:20,
      page_end:false,
      loadding:false,
      sort_eye:false,
      sort_calander:true,
      sort_like:false,
      tag:[],
      activeid:'',
      user:''
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了

    this.fetchDataOrder();
    this.getTags();
console.log(this.$parent.user);
  },
  methods: {
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
      var id =  e.currentTarget.id;

      if(this.activeid == id)
        {this.activeid = "";}
      else{
        this.activeid = id;

      }
      this.initList();
    },
    fetchData () {
      this.$http.get('/api/doc')
      .then(res => {
        this.data = res.data;

      })
      .catch(err => {
        this.toastr.error(`${err.message}`, 'ERROR!')
      })
    },
    fetchDataOrder(){
      if(this.page_end || this.loadding){
        return ;
      }
      this.loadding = true;
      this.$http.post('/api/docOrderMine',{
        page:this.page,
        sort_eye:this.sort_eye,
        sort_calander:this.sort_calander,
        sort_like:this.sort_like,
        tagid:this.activeid,
        pageSize:this.pageSize
      })
      .then(res => {
        this.page = this.page +1;
        this.data = this.data.concat(res.data);
        this.loadding = false;
        if(res.data.length < this.pageSize){
          this.page_end = true;
        }
      })
      .catch(err => {
        this.toastr.error(`${err.message}`, 'ERROR!')
      })
    },
    initList(){
      this.page = 1;
      this.loadding = false;
      this.page_end = false;
      this.data = [];
      this.fetchDataOrder();
    },
   // 删除
   remove(doc) {
    console.log(doc)
    let id = doc
    this.$http.delete(`/api/doc/${id}`)
    .then(res => {
     window.location.reload();
     this.$router.push(`/doc`)
     toastr.success(res.data.msg);
   })
    .catch(e => console.log(e))
  },
  edit(e){
    e.preventDefault();
    e.stopPropagation();
    var id = e.currentTarget.id;
    this.$router.push(`/edit/${id}`)
  },

    // 跳转
    showDetail(id) {
      console.log(id);
      this.$router.push(`/detail/${id}`)
      // window.history.pushState(
      //   null,
      //   'Detail',
      //   '/detail/'+id
      //   )
    },
    search(e){
      var val = e.currentTarget.value;
      if(val){
        this.$http.get(`/api/docbyvalMine/${val}`)
        .then(res => {
          this.data = res.data;
        })
        .catch(e => console.log(e))
      }else{
        this.fetchData()
      }
    },
    handleScroll(){
      　　var scrollTop = document.body.scrollTop;
      　　var scrollHeight = document.body.scrollHeight;
      　　var windowHeight = this.allheight;
      　　if(scrollTop + windowHeight == scrollHeight){
        　　　　this.fetchDataOrder();
      　　}

    }
  },

  filters:{
    fomatTime:function(value){
      return new dateUtil().exchange(value);
    }
  },
  components: {
    MainLayout
  },
  mounted(){
    this.allheight = window.innerHeight;
    window.addEventListener('scroll', this.handleScroll);
    // this.$refs.sort.addEventListener('click', this.sort);

  }
}


</script>
