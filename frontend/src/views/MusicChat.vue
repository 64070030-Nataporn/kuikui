<template>
    <div>
      <!-- AfterLoginNav component -->
      <AfterLoginNav />
  
      <div class="containerChat">
        <!-- navbar -->
  
        <div class="typeChat">
          <!-- Chat type icons -->
          <router-link to="/bookchat" >
            <img class="imgBooks" src="https://media.discordapp.net/attachments/1079116062571892827/1079116602504659047/book-png-18.png">
          </router-link>
          <router-link to="/musicchat">
            <img class="imgMusic" src="https://media.discordapp.net/attachments/1079116062571892827/1079116698839429140/640px-Itunes-music-app-icon.png">
          </router-link>
          <router-link to="/moviechat">
            <img class="imgMovie" src="https://media.discordapp.net/attachments/1079116062571892827/1079116777511985233/online-cinema-art-movie-watching-with-popcorn-and-film-strip-cinematograph-concept-png.png?width=663&height=663">
          </router-link>
        </div>
  
        <div>
          <div class="chatting">
            <div class="user-detail">
              <img class="typeChating" src="https://media.discordapp.net/attachments/1079116062571892827/1079116698839429140/640px-Itunes-music-app-icon.png">
              <h4>Music Chat</h4>
            </div>
            <div id="render" class="renderchat">
              <div v-for="msg in mss" :key="msg.id">
                <div class="chat-outcoming" v-if="msg.email === user.email">
                  <div class = "uname" >{{ msg.username }}</div>
                  <span style="color: aliceblue">{{ msg.message }}</span>
                  <img class="user" style="width: 4%;" src="http://localhost:3000/uploads/person.png" alt="">
                </div>
                <div class="chat-incoming" v-else-if="msg.email !== user.email">
                  <div class = "oname" >{{ msg.username }}</div>
                  <img class="user" style="width: 4%;" src="http://localhost:3000/uploads/person.png" alt="">
                  <span style="color: aliceblue">{{ msg.message }}</span> 
                </div>
              </div>
            </div>
            <div class="sendmsg">
              <input id="textMsg" v-model="message" style="margin-top: 6%; margin-bottom: 2%;" class="form-control" placeholder="ข้อความ" type="text">
              <button id="btnSend" @click="submit()" class="btn-primary">ส่ง</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AfterLoginNav from "../components/MainNavbar.vue";
  import axios from '@/plugins/axios';
  
  export default {
    components: {
      AfterLoginNav,
    },
    data() {
      return {
        user: null,
        sender: [],
        mss: [],
        email: "",
        username: "",
      };
    },
    mounted() {
      this.onAuthChange();
      this.inMessage();
    },
    methods: {
      submit() {
        const data = {
          message: this.message,
          email: this.user.email,
          username: this.user.username,
        };
  
        axios
          .post("http://localhost:3000/musicchat", data)
          .then((res) => {
            this.mss = res.data.all;
            this.message = "";
            console.log(res.data);
            this.scrollToBottom(); // Scroll to bottom after sending message
          })
          .catch(() => {});
      },
      // Function to scroll to the bottom of the chat container
      scrollToBottom() {
        const container = document.querySelector('.renderchat');
        container.scrollTop = container.scrollHeight;
      },
      onAuthChange() {
        const token = localStorage.getItem('token');
        if (token) {
          this.getUser();
        } else {
          this.$router.push({ path: '/login' });
        }
      },
      getUser() {
        axios.get('http://localhost:3000/user/me').then((res) => {
          this.user = res.data;
          console.log(this.user);
        });
      },
      LogOut() {
        localStorage.removeItem('token');
        location.reload();
      },
    },
  };
  </script>
    
   
  
  <style scoped>
  .uname{
    color: black;
    position: relative;
    top: -25px;
      left: 500px;
  }
  .oname{
    color: black;
    position: relative;
    top: -25px;
    left: 100px;
  }
  .textsmall {
      font-family: 'Roboto', sans-serif;
  }
  
  .headertext {
      font-family: 'Prompt', sans-serif;
  }
  
  .quotes {
      font-family: 'Mitr', sans-serif;
  }
  
  .calendar {
      position: relative;
      width: 100%;
      height: 100%;
      color: #878895;
      border-radius: 5px;
      background-color: white;
  }
  
  .calendar .month {
      padding: 0 50px;
      text-transform: capitalize;
  }
  
  .calendar .month .prev, 
  .calendar .month .next {
      cursor: pointer;
  }
  
  .calendar .month .prev:hover, 
  .calendar .month .next:hover {
      color: hsl(0, 0%, 29%);
  }
  
  .calendar .weekdays {
      padding: 0 20px;
      font-size: 1rem;
      text-transform: capitalize;
  }
  
  .calendar .days {
      padding: 0 20px;
      margin-bottom: 20px;
  }
  
  .calendar .days .day {
      cursor: pointer;
  }
  
  .calendar .day:not(.prev-date, .next-date):hover {
      color: #fff;
      background-color:  #826B5D;
  }
  
  .calendar .days .prev-date,
  .calendar .days .next-date {
      color: #878895;
  }
  
  .calendar .days .active {
    position: relative;
    border: black;
    font-size: 1.5rem;
    color: white;
    background-color: #dda15e;
  }
  
  .calendar .days .today {
    font-size: 1.5rem;
    color: #fff;
    background-color:#3f3027;
  }
  
  .calendar .days .event {
    position: relative;
  }
  
  .calendar .days .event::after {
    content: "";
    position: absolute;
    bottom: 10%;
    left: 50%;
    width: 75%;
    height: 5px;
    border-radius: 30px;
    transform: translateX(-50%);
    background-color: #878895;
  }
  
  .calendar .event:hover::after {
    background-color: #fff;
  }
  
  .calendar .active.event::after {
    background-color: #fff;
    bottom: 20%;
  }
  
  .calendar .active.event {
    padding-bottom: 20px;
  }
  
  .events {
      width: 100%;
      height: 70%;
      overflow-x: hidden;
      overflow-y: auto;
  }
  
  .events .event {
      width: 95%;
      cursor: pointer;
  }
  
  .events .event:hover {
    background-color: lightseagreen;
  }
  
  .categories {
      width: 50%;
      border-radius: 90px;
  }
  
  .categories .icon-cat {
      width: 64px;
      height: 64px;
  }
  
  .profileimg {
      width: 196px;
      height: 196px;
      border-radius: 360px;
  }
  
  .toroomimg {
      width: 250;
      height: 180px
  }
  
    .txtbook{
      position: absolute;
      top: 55.5%;
      left:61.5%;
    }
    .txtmusic{
      position: absolute;
      top: 55.5%;
      left:71.5%;
    }
    .txtmovie{
      position: absolute;
      top: 55.5%;
      left:81.5%;
    }
  
    .typeChat{
      background-image: linear-gradient(to right, lightblue 0%, lightblue 25%, white 25%, white 25%);
      min-height: 100vh;
  }
  .imgBooks{
  position: absolute;
  top: 15%;
  left:5%;
  width:15%;
  } 
  .imgMusic{
  position: absolute;
  top: 45%;
  left:7.5%;
  width:10%;
  } 
  .imgMovie{
  position: absolute;
  top: 67%;
  left:6%;
  width:13%;
  } 
  .chatting{
  width: 75%;
  height:100%;
  position: absolute;
  left:25%;
  top:0%;
  padding-left:2%;
  padding-right:1%;
  padding-top: 7%;
  padding-bottom: 5%;
  color:rgb(0, 0, 0);
  }
  .user{
  width:5%;
  height:5%;
  object-fit: cover;
  border-radius: 60%;
  }
  .typeChating{
  width:5%;
  height:5%;
  object-fit: cover;
  }
  .user-detail{
  display: flex;
  align-items: center;
  
  }
  .user-detail h4{
  margin-left:2%;
  }
  .renderchat{
  width:100%;
  height:90%;
  overflow: scroll;
  padding-top: 3%;
  }
  .chat-incoming{
  width: 100%;
  display: flex;
  
  }
  .chat-incoming span{
  width: 50%;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  border-radius: 15px;
  background-color: rgb(195, 197, 197);
  margin-left: 2%;
  margin-bottom: 5%;
  max-width: 50%;
  font-size: 18px;
  }
  .chat-outcoming{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  }
  .chat-outcoming span{
  width: 50%;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  border-radius: 15px;
  background-color: rgb(0, 0, 0);
  color: aliceblue;
  margin-right: 2%;
  margin-bottom: 5%;
  max-width: 50%;
  font-size: 18px;
  }
  .sendmsg{
  display: flex;
  align-items: center;
  width: 90%;
  height: 5%;
  }
  .form-control{
  width: 100%;
  padding: 1.5%;
  margin-bottom: 1%;
  border: 2px solid black;
  border-radius: 50px;
  }
  .btn-primary{
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: #0084f0;
  border-radius: 5px;
  margin-left: 2%;
  color: white;
  position: absolute;
  top:92%;
  left:90%;
  }
  
  </style>