<template>
  <nav>
    <ul class="navbar" >
      <h1 class="logo"><router-link to="/" id="" >KUIKUI</router-link></h1>
      <li class="navmenu" v-if="this.user"><router-link to="/profile" id="" >Let's Enjoy</router-link></li>
      <li class="navmenu" v-if="!this.user"><router-link to="/login" id="login" >Login</router-link></li>
      <li class="navmenu" v-if="this.user"><a @click="LogOut()"> Logout </a></li>
     
      
            
         
    </ul>
    
  </nav>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  // โค้ดที่เกี่ยวข้องกับ Navbar
  data() {
    return {
    user: null
  }
},
mounted () {
   this.onAuthChange()
 },
 methods: {
   onAuthChange () {
     const token = localStorage.getItem('token')
     if (token) {
       this.getUser()
     }
    
   },
   getUser () {
    //  const token = localStorage.getItem('token')
     axios.get('http://localhost:3000/user/me').then(res => {
       this.user = res.data
       console.log(this.user)
     })
   },
   LogOut(){
    localStorage.removeItem('token')
    location.reload()
 
   }
 },
};
</script>

<style scoped>


.navbar {
width: 100%;
list-style-type: none;
margin: 0;
padding: 0;
overflow: hidden;
background-color: #f1e68f;
display: flex;
justify-content: space-between;
align-items: center;
}

.logo {
margin-left: 2%;
}

.navmenu {
margin-right: 2%;
}

.navmenu a {
display: block;
color: black;
text-align: center;
text-decoration: none;
} 
</style>
