<template>
  <el-main>
    <el-row :gutter="10" type="flex" class="row-bg bee-panel" justify="center">
      <el-col :sm="10" :md="18">
        <div class="bee-panel-nav bee-card bee-card-container">
          <el-col :sm="10" :md="12" :push="6">
            <el-form label-position="right" label-width="90px" :model="formData">
              <el-form-item label="标题">
                <el-input v-model="formData.content"></el-input>
              </el-form-item>
              <el-form-item label="问题描述">
                <el-input type="textarea" v-model="formData.content"></el-input>
              </el-form-item>
              <el-form-item label="开启悬赏">
                <el-switch v-model="formData.content"></el-switch>
              </el-form-item>
              <el-form-item label="悬赏幸运币">
                <el-input-number v-model="formData.content" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
              </el-form-item>
              <el-form-item label="悬赏截止">
                <el-col :span="11" style="padding-left:0px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formData.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker type="fixed-time" placeholder="选择时间" v-model="formData.date2"
                                  style="width: 100%;"></el-time-picker>
                </el-col>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  import UpFile from '../../components/UpFile'
  import $ from 'jquery'

  export default {
    components: {
      UpFile
    },
    data() {
      return {
        tagadding: false,
        isEdit: false,
        formData: {
          lb_img: [],
          tag: [],
          labels: [],
          content: '',
          date1: '',
          date2: ''
        },
        labels: [],
        tags: []
      }
    },
    mounted() {
      this.getTags();
      this.getLabels();
      let that = this;
      $(function () {
        $('#askForm').validator({
          submit: function () {
            var formValidity = this.isFormValid();
            if (formValidity) {
              that.publish();
            } else {
              // $('#my-alert').modal();
            }

          }
        });
      });
    },
    methods: {
      //上传图片
      setLbImg(lb_img) {
        this.formData.lb_img = lb_img;
      },
      //立即发布
      publish() {
        this.$http.post('/api/ask/add', this.formData)
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getTags: function () {
        this.$http.post('/api/tag')
          .then(res => {
            this.tags = res.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      //获取系统标签
      getLabels: function () {
        this.$http.get('/api/system/getlabel')
          .then(res => {
            this.labels = res.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      caddtag() {
        this.tagadding = !this.tagadding;
      },
      newtag(e) {
        var tagname = e.currentTarget.value;
        if (tagname) {
          this.$http.post('/api/newtag', {
            name: tagname
          })
            .then(res => {
              if (!res.data.code) {
                this.getTags();
                this.caddtag();
              } else {
                this.toastr.error(`${res.data.msg}`, 'ERROR!')
              }
            })
            .catch(e => {

            })
        } else {
          this.caddtag();
        }
      },
      tagIt(e) {
        if (this.formData.tag.length <= 3) {
          var id = e.currentTarget.id;
          var name = e.currentTarget.dataset.name, index = -1;
          this.formData.tag.forEach(function (val, i, arr) {
            if (arr[i] == id) {
              index = i;
            }
          })
          if (index < 0) {
            this.formData.tag.push(id);
          }
          else {
            this.formData.tag.splice(index, 1);
          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .am-form {
    width: 600px;
    margin: auto;
    border: 1px solid #e0dddd;
    padding: 15px;
    background: #fdfdfd;
  }

  input[type='file'] {
    opacity: 0;
    width: 163px;
    margin-top: -32px;
    height: 32px;
    margin-left: 52px;
  }

  .bee-tag-input {
    display: none !important;
  }

  .bee-tag-input.is-active {
    display: inline-block !important;
  }

</style>
