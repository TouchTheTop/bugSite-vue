import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'pages/Home'
import About from 'pages/About'
import Add from 'pages/Add'
import Beepage from 'layouts/Beepage'
import Detail from 'pages/Detail'
import Doc from 'pages/Doc'
import Login from 'pages/Login'
import Mybug from 'pages/Mybug'
import Mytag from 'pages/Mytag'
import myCollect from 'pages/myCollect'
import github from 'pages/github'
import Ask from 'pages/Ask'


Vue.use(VueRouter)


// const routes = {
//   '/': 'Home',
//   '/about': 'About',
//   '/doc':'Doc',
//   '/add':'add',
//   '/detail/:id':'Detail'
// }

const routes = [

  {path: '/', name: "/doc", redirect: '/beepage'},
  {path: '/login', name: "login", component: Login},
  {
    path: '/beepage', name: 'bee', component: Beepage,
    children: [

      {path: '/', name: "/doc", component: Doc},

      {path: '/about', name: "about", component: About},
      {path: '/doc', name: "doc", component: Doc},
      {path: '/doc/:id', name: "docbyid", component: Doc},
      {path: '/add', name: "add", component: Add},
      {path: '/detail/:id', name: "detail", component: Detail},
      {path: '/edit/:id', name: "edit", component: Detail},
      {path: '/mybug', name: "mybug", component: Mybug},
      {path: '/writeAsk', name: "writeAsk", component: Ask},
      {path: '/mytag', name: "mytag", component: Mytag},
      {path: '/myCollect', name: "myCollect", component: myCollect},
      {path: '/github', name: "github", component: github}

    ]
  },
]


export default new VueRouter({
  routes: routes
});
