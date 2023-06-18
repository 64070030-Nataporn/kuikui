<template>
  <div>
    
    <div class="auth-wrapper">
      <div class="auth-inner">
      <router-view/>
    </div>
    </div>
  </div>
</template>


<script>
// import axios from '@/plugins/axios'
// // import HomePage from "@/views/HomePage.vue";
// export default {
//   data () {
//     return {
//       user: null
//     }
//   },
//   mounted () {
//      this.onAuthChange()
//    },
//    methods: {
//      onAuthChange () {
//        const token = localStorage.getItem('token')
//        if (token) {
//          this.getUser()
//        }
//        else{
//         this.$router.push({path: '/login'})
//        }
//      },
//      getUser () {
//       //  const token = localStorage.getItem('token')
//        axios.get('http://localhost:3000/user/me').then(res => {
//          this.user = res.data
//        })
//      },
//      LogOut(){
//       localStorage.removeItem('token')
//       location.reload()
   
//      }
//    },
//    created(){
     
//    }
// }
</script>









<style>

</style>
