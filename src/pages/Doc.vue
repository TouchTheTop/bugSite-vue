<template>
  <el-row :gutter="10" type="flex" class="row-bg" justify="center">
    <el-col :gutter="12">
      <el-col :span="6" class="bee-card" v-for="(item,i) in data" :key="i">
        <el-card shadow="hover">
          <div class="bee-box" :class="item.img?'is-sticky':''">
            <div class="bee-tag" >标签</div>
          </div>
          <img :src="item.img" class="image">
          {{item.title}}
          <el-rate
            v-model="3.7"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
          <div class="bottom clearfix">
            <time class="time">{{item.created_at}}</time>
            <el-button type="text" class="button card-but">已有17条评论</el-button>
          </div>
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>

  import NavLeft from '../layouts/Left.vue'
  import MainLayout from '../layouts/Main.vue';

  export default {
    components: {
      NavLeft,
      MainLayout
    },
    data() {
      return {
        data: [],
        allheight: '',
        page: 1,
        pageSize: 10,
        page_end: false,
        loadding: false,
        sort_eye: false,
        sort_calander: true,
        sort_like: false,
        tag: [],
        activeid: '',
        user: ''
      }
    },
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了

      this.fetchDataOrder();
      this.getTags();
      console.log(this.$parent);
    },
    methods: {
      getTags: function () {
        this.$http.post('/api/tag')
          .then(res => {
            this.tag = res.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      tagIt(e) {
        var id = e.currentTarget.id;

        if (this.activeid == id) {
          this.activeid = "";
        }
        else {
          this.activeid = id;

        }
        this.initList();
      },
      fetchData() {
        this.$http.get('/api/doc')
          .then(res => {
            this.data = res.data;

          })
          .catch(err => {
            this.toastr.error(`${err.message}`, 'ERROR!')
          })
      },
      fetchDataOrder() {
        if (this.page_end || this.loadding) {
          return;
        }
        this.loadding = true;
        this.$http.post('/api/docOrder', {
          page: this.page,
          sort_eye: this.sort_eye,
          sort_calander: this.sort_calander,
          sort_like: this.sort_like,
          tagid: this.activeid
        })
          .then(res => {
            this.page = this.page + 1;
            this.data = this.data.concat(res.data);
            this.loadding = false;
            if (res.data.length < this.pageSize) {
              this.page_end = true;
            }
          })
          .catch(err => {
            this.toastr.error(`${err.message}`, 'ERROR!')
          })
      },
      sort(e) {
        this.sort_eye = false,
          this.sort_calander = false,
          this.sort_like = false
        switch (parseInt(e.target.dataset.item)) {
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
      initList() {
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
      search(e) {
        var val = e.currentTarget.value;
        if (val) {
          this.$http.get(`/api/docbyval/${val}`)
            .then(res => {
              this.data = res.data;
            })
            .catch(e => console.log(e))
        } else {
          this.fetchData()
        }
      },
      handleScroll() {
        var scrollTop = document.body.scrollTop;
        var scrollHeight = document.body.scrollHeight;
        var windowHeight = this.allheight;
        if (scrollTop + windowHeight == scrollHeight) {
          this.fetchDataOrder();
        }

      }
    },

    filters: {
      fomatTime: function (value) {
        return new dateUtil().exchange(value);
      }
    },
    mounted() {
      this.allheight = window.innerHeight;
      window.addEventListener('scroll', this.handleScroll);
      // this.$refs.sort.addEventListener('click', this.sort);

    }
  }


</script>
