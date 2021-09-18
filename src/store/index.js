import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '@/router'
import VueJwtDecode from 'vue-jwt-decode'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_type:''||'',
    token:''||''
  },
  getters:{
    getUserType(state){
      return state.user_type
    },
    getToken(state){
      return state.token
    }
  },
  mutations: {
    setUserType(state,payload){
      state.user_type=payload
    },
    setToken(state,payload){
      state.token=payload
    }

  },
  actions: {
   async getUserToken({commit},params){
   await axios.post('http://192.168.0.18:8001/users/login/',params).then((res)=>{
          console.log(res)
        const info= VueJwtDecode.decode(`${res.data.access}`)
         console.log(info)
         localStorage.setItem('token',res.data.access)
         localStorage.setItem('user_type',info.user_type)
         commit('setToken',res.data.access)
         commit('setUserType',info.user_type)
         console.log("user turi", info.user_type)
         router.push({path:'/'})
         if(info.user_type=="Moderator"){
           router.push({name:'Moderator'})
         }
         else if(info.user_type=="admin"){
          router.push({name:'Admin'})
         }
         else{
          router.push({name:'User'})
         }

    }).catch(err=>{
      console.log(err)
    })
  }
},
  modules: {
  }
})
