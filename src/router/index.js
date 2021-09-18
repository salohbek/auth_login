import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/login"
import Moderator from "@/views/moderator"
import Admin from "@/views/admin"
import User from "@/views/user"
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/moderator',
    name: 'Moderator',
    component: Moderator,
    meta: { auth: true },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { auth: true },
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { auth: true },
  },
  {
    path: '/about',
    name: 'About',
    meta: { auth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token=localStorage.getItem('token')
  const user_type=localStorage.getItem('user_type')
  const requireAuth=to.meta.auth
if(requireAuth  && user_type=="Moderator"){
     if(to.name=="Admin" || to.name=="Teacher"){
       next({path:'/moderator'})
       return
     }
       next()
       return
   }
   if(requireAuth  && user_type=="Admin"){
    if(to.name=="Moderator" || to.name=="Teacher"){
      next({path:'/admin'})
      return
    }
      next()
      return
  }
  if(requireAuth  && user_type=="Teacher"){
    if(to.name=="Admin" || to.name=="Moderator"){
      next({path:'/user'})
      return
    }
      next()
      return
  }
//  if(requireAuth && store.getters.getUserType=="Moderator" && user_type=="Moderator"){
//    if(to.name=="Admin" || to.name=="User"){
//      next({path:'/moderator'})
//      return
//    }
//      next()
//      return
//  }

//  if(requireAuth && store.getters.getUserType=="Admin" && user_type=="Admin"){
//   if(to.name=="Moderator" || to.name=="User"){
//     next({path:'/admin'})
//     return
//   }
//     next()
//     return
// }
// if(requireAuth && store.getters.getUserType=="User" && user_type=="User"){
//   if(to.name=="Admin" || to.name=="Moderator" || to.path=="/admin" || to.path=="/moderator" ){
//     next({redirect:'/user'})
//     return
//   }
//     next()
//     return
// }

// bu esa agar token bo'lsa login page ga borolmaslik uchun faqat bir marta iwlatiladi chiqilsa keyin yana chiqadi login
 if (token && store.getters.getToken) {
 if(to.name=="Login"){
  next({name:'Home'})
  return
 }
 }
//  bu yerda agar token kemasa boshqa pagelarda qolib ketgan bo'lsa loginga yuboradi

 else{
   if(to.name!=="Login"){
     next({name:"Login"})
     return
   }
 }
 next()
 })
export default router
