import Vue from 'vue'
import dateUtil from './dateUtil'
import toastr from 'toastr'
import ElementUI from 'element-ui'
import Vodal from 'vodal'
import App from './layouts/Main'
import axios from 'axios'
import router from './router'
import 'toastr/build/toastr.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon.css'
import 'vodal/fade.css'
import './assets/style/main.css'
import FileWorker from './assets/js/UpFile'

Vue.use(ElementUI);
Vue.prototype.$http = axios
Vue.prototype.toastr = toastr
Vue.component(Vodal.name,Vodal)
Vue.prototype.$FileWorker = FileWorker

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
// Vue.filter('imgUrlPrefix',(value) => {
//   const url = value.substr(7)
//   const prefix = "https://images.weserv.nl/?url="
//   return prefix + url
// })
Vue.filter('castsToString',(casts) => {
  return casts.map(item => {
    return item.name
  })
})

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  update: function (el) {
    // Focus the element
    el.focus()
  }
})

/* eslint-disable no-new */
const app = new Vue({
  created(){
    toastr.success('启动成功!')
  },

  //   data: {
  //   currentRoute: window.location.pathname
  // },
  // computed: {
  //   ViewComponent () {console.log(router[this.currentRoute]);
  //     const matchingView = router[this.currentRoute]
  //     return matchingView
  //       ? require('./pages/' + matchingView + '.vue')
  //       : require('./pages/404.vue')
  //   }
  // },
  router,
  render (h) {
    return h(App)
  },

}).$mount('#app')

// window.addEventListener('popstate', () => {
//   app.currentRoute = window.location.pathname
// })
