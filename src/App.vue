<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login">Login</router-link>|
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <!-- <router-link to="/moderator">moderator</router-link>|
      <router-link to="/admin">admin</router-link>|
      <router-link to="/user">user</router-link>| -->
      <button @click="logout">logout</button>
    </div>
    <router-view/>
    User turi : {{getUserType|| ' malumot kelmadi '}}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    methods:{
    logout(){
      localStorage.clear()
      this.$store.commit('setToken','')
      this.$store.commit('setUserType','')
      console.log("Muvaffaqiyatli chiqdingiz!")
      this.$router.push('/login')

    }
  },
  computed: {
    ...mapGetters([
      'getUserType',
    ])
  },
}
</script>
<style lang="scss">
body{
  background-color: beige;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
