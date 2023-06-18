<template>
  <div>
    <MainNavbar/>
    <div class="container">
      <header>
        <div class="header-info">
          <div class="welcome">Welcome to KUIKUI !</div>
          <h1>Meet new friends and enjoy your life</h1>
          <br /><br />
          <img
            src="https://media.discordapp.net/attachments/1020775005866447019/1079113988056567828/3d-casual-life-girl-with-books.png"
          />
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <div class="body1">
          <div class="txtbody1">
            <h1 class="txtbody1">Choose what interests you</h1>
            <br /><br />
          </div>
          <div class="imgbody1">
            <img
              class="imgbody1_1"
              src="https://media.discordapp.net/attachments/1079116062571892827/1079116602504659047/book-png-18.png"
            />
            <img
              class="imgbody1_1"
              src="https://media.discordapp.net/attachments/1079116062571892827/1079116698839429140/640px-Itunes-music-app-icon.png?width=467&height=467"
            />
            <img
              class="imgbody1_1"
              src="https://media.discordapp.net/attachments/1079116062571892827/1079116777511985233/online-cinema-art-movie-watching-with-popcorn-and-film-strip-cinematograph-concept-png.png?width=467&height=467"
            />
          </div><br /><br /><br /><br /><br /><br /><br /><br />
          
        </div>
        <div class = "body2">
          <h1 class="txtbody2">Inside KUIKUI , you can....?!</h1><br /><br /><br /><br /><br /><br /><br /><br />
            <div>
                <h1 class="">Chatting!</h1>
                <img class=""
                    src="https://media.discordapp.net/attachments/1079116062571892827/1079121879173968052/image.png">
                <img class=""
                    src="https://media.discordapp.net/attachments/1079116062571892827/1079122939015856168/business-3d-young-woman-in-casual-clothes-and-glasses-standing-with-phone.png?width=147&height=467">
                <h1 class="">You can chat to people who share the same interests as you.</h1>
            </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>

import MainNavbar from "@/components/MainNavbar.vue";

export default {
  components: { MainNavbar },
  data() {
    return {};
  },
  components:{
    MainNavbar
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  
}
.welcome{
  font-size: 100px;
  font-weight: bold;
}
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 280vh;
}

.header-info {
  text-align: center;
}

.body1 {
  text-align: center;
  width: 100%;
  
}

.imgbody1 {
  width: 100%;
  height: 250px;
  display: inline-block;
  white-space: nowrap;
  float: left;
}

.imgbody1_1 {
  margin-right: 50px;
  position: static;
  left: 10%;
  width: 250px;
}

.txtbody2 {
  position: relative;
  top: 100%;
}

.body2 {
  margin-top: 100px;
  position: relative;
  left: 35%;
  display: inline-block;
}

/* เพิ่มสไตล์สำหรับหน้าจอขนาดเล็ก (mobile) */
@media (max-width: 768px) {
  .container {
    height: auto;
  }

  .imgbody1 {
    height: auto;
  }

  .imgbody1_1 {
    margin-right: 10px;
    width: 150px;
  }

  .txtbody2 {
    margin-top: 50px;
  }

  .body1,
  .body2 {
    height: auto;
  }
}
</style>
