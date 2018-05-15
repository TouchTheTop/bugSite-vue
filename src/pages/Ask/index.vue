<template>
  <div>
    <h2 class="bee-page-title"><i class="fa fa-pencil"></i>我要问</h2>
    <hr data-am-widget="divider" style="" class="am-divider am-divider-default"/>

    <form id="askForm" class="am-form am-form-horizontal">
      <fieldset>


        <div class="am-form-group">
          <label for="doc-vld-name">系统标签：</label>
          <select name='test' multiple v-model="formData.labels" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}"
                  placeholder="请选择" required>
            <option value="">-=请选择一项=-</option>
            <option :value="item.label_id" v-for="(item,i) in labels" :key="i">{{item.name}}</option>
          </select>
        </div>

        <div class="am-form-group">
          <label for="doc-vld-name">我的标签：</label>
          <div class="bee_types_choose">
            <a href="#" :id="item._id" :data-name="item.name" v-for="item in tags" @click.prevent="tagIt($event)"
               :class="formData.tag.indexOf(item._id)>=0?'active':''">{{item.name}}</a>
            <input class="bee-tag-input" :class="tagadding?'is-active':''" type="text" @blur="newtag" placeholder="标签" v-focus='tagadding'>
            <a href="#" class="plus-btn" @click.prevent="caddtag"><i class="fa fa-plus"></i></a>
          </div>
        </div>

        <div class="am-form-group">
          <label for="doc-ta-1">问题描述：</label>
          <textarea class="" v-model="formData.content" rows="5" id="doc-ta-1" required></textarea>
        </div>


        <div class="am-form-group">
          <label for="doc-vld-name">悬赏：</label>

          <div class="am-input-group">
            <input type="text" class="am-form-field" placeholder="不填即不设置悬赏">
            <span class="am-input-group-label">枚幸运币</span>
          </div>
          <p class="bee-depc">您还有 23 枚幸运币可用</p>
        </div>

        <div class="am-form-group">
          <label for="doc-vld-name">图片：</label>
          <Up-file @setLbImg="setLbImg"></Up-file>
        </div>

        <div class="am-form-group">
          <div class="am-u-sm-6 am-u-sm-offset-3">
            <button  class="am-btn am-btn-primary am-u-sm-12 " >立即发布</button>
          </div>
        </div>

      </fieldset>
    </form>
    <div class="am-modal am-modal-alert" tabindex="-1" id="my-alert">
      <div class="am-modal-dialog">
        <div class="am-modal-hd">提示</div>
        <div class="am-modal-bd">
          请检查输入！
        </div>
        <div class="am-modal-footer">
          <span class="am-modal-btn">好</span>
        </div>
      </div>
    </div>
  </div>
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
        tagadding:false,
        isEdit:false,
        formData: {
          lb_img: [],
          tag:[],
          labels:[],
          content:''
        },
        labels:[],
        tags: []
      }
    },
    mounted(){
      this.getTags();
      this.getLabels();
      let that = this;
      $(function() {
        $('#askForm').validator({
          submit: function() {
            var formValidity = this.isFormValid();
            if(formValidity){
              that.publish();
            }else{
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
      publish(){
        this.$http.post('/api/ask/add',this.formData)
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
              }else{
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
          var name = e.currentTarget.dataset.name,index = -1;
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

  .bee-tag-input{
    display: none !important;
  }

  .bee-tag-input.is-active{
    display: inline-block !important;
  }

</style>
