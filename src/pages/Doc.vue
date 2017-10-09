
<template>
  <div>
    <div class="ctl_bar">
     <div class="search-animate">
      <i class="fa fa-search " aria-hidden="true"></i>
      <input type="text" placeholder="请输入文章标题"  @input="search($event)" />
    </div>
    <div class="sort" ref="sort" @click.capture='sort($event)'>
      <span class="fa fa-calendar" :sort="sort_calander" data-item="0"></span>
      <span class="fa fa-eye" :sort="sort_eye" data-item="1"></span>
      <span class="fa fa-heart" :sort="sort_like" data-item="2"></span>
    </div>
  </div>

  <div class="types">
    <a href="#" :id="item._id" v-for="item in tag"  @click.prevent="tagIt($event)" :class="item._id==activeid?'active':''">{{item.name}}</a>
  </div>
  <ul class="list">
    <li v-for="item in data">
      <a >
        <div class="list-item" :id="item._id" @click="showDetail(item._id)">
          <div class='box pic'>
            <img :src="item.img?item.img:'http://images.csdn.net/20170821/androiddatahero_meitu_1.jpg'" alt="" /></div>
            <div class="box content">
              <p class="title">{{item.title}}</p>
              <p class="asset">{{item.content?item.content:item.asset}}</p>
              <div class="msgother">
               <span class='time'>{{item.update_at | fomatTime }}</span>
             </div>
             <div class="infoport">
              <a href="" class="fa fa-heart like" title="喜欢" > {{item.like}}</a>
              <a href="" class="fa fa-eye" title="浏览"> {{item.eye}}</a>
            </div>

            <div class="tags">
              <span v-for="tag in item.tag">{{tag.name}}</span>
            </div>

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
      pageSize:10,
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
console.log(this.$parent);
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
      this.$http.post('/api/docOrder',{
        page:this.page,
        sort_eye:this.sort_eye,
        sort_calander:this.sort_calander,
        sort_like:this.sort_like,
        tagid:this.activeid
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
    sort(e){
      this.sort_eye = false,
      this.sort_calander = false,
      this.sort_like = false
      switch(parseInt(e.target.dataset.item)) {
        case 0:
        this.sort_calander = true;
        break;
        case 1:
        this.sort_eye = true;
        break;
        case 2:
        this.sort_like = true;
        break;
      }
      this.initList();
    },
    initList(){
      this.page = 1;
      this.loadding = false;
      this.page_end = false;
      this.data = [];
      this.fetchDataOrder();
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
        this.$http.get(`/api/docbyval/${val}`)
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
