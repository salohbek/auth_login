<template>
    <div class="login__wrapper">
        <form @submit.prevent="login()">
            <input type="email" placeholder="Email kirgizing" v-model="form.email"><br><br>
            <input type="password" placeholder="password  kirgizing" v-model="form.password">
            <br><br>
            <button>kirish</button>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                form:{
                    email:'',
                    password:''
                }
            }
        },
        methods:{
            login(){
                this.$store.dispatch('getUserToken',this.form)
            }
        },
 
    }
</script>

<style scoped>
*{
    padding: 10px;
}
button{
    background-color: rgb(21, 4, 248);
    color: white;
    font-size: 20px;
    padding: 5px 60px;
}
</style>