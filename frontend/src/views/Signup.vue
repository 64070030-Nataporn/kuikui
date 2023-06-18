<template>
  <div>
    <MainNavbar />
    <div id="regis" class="container">
      <div class="columns">
        <div class="column">
          <img
            class="imgRegister"
            src="https://media.discordapp.net/attachments/1079116062571892827/1079357386852143124/3d-business-young-woman-sitting-with-a-laptop-and-waving-her-hand.png"
          />
        </div>
        <div class="column" id="register">
          <form @submit.prevent="handleSubmit">
            <h1 class="title txtRegister1">Register</h1>
            <p class="txtName">Username</p>
            <input
              v-model="username"
              @input="validateUsername()"
              class="input inputName"
              name="username"
              type="text"
              id="username"
              placeholder="Username"
            />
            <span class="validateName has-text-danger">
              {{ error.username }}</span
            ><br /><br />

            <p class="txtRegister">Email</p>
            <input
              v-model="email"
              @input="validateEmail()"
              id="email"
              class="input input2"
              name="email"
              type="email"
              placeholder="Email"
            />
            <span class="validateEmail has-text-danger"> {{ error.email }}</span
            ><br /><br />

            <p class="txtPassword1">Password</p>
            <input
              v-model="password"
              @input="validatePassword()"
              class="input input3"
              name="password"
              id="pwd"
              type="password"
              placeholder="Password"
            />
            <span class="validatePassword has-text-danger">
              {{ error.password }}</span
            ><br /><br />

            <p class="txtConfirmPassword1">Confirm Password</p>
            <input
              v-model="confirm_password"
              @input="validateConfirmPassword()"
              class="input input4"
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              placeholder="Password"
            />
            <span class="validateConfirmPassword has-text-danger">
              {{ error.confirm_password }}</span
            ><br /><br />
            <p class="subtitle txtFavourite">Favourite Types</p>
            <div class="control">
              <label class="checkbox">
                <input
                  type="checkbox"
                  class="checkbook"
                  v-model="typefav"
                  value="1"
                />
                Book

                <input
                  type="checkbox"
                  class="checkmusic"
                  v-model="typefav"
                  value="2"
                />
                Music

                <input
                  type="checkbox"
                  class="checkmovie"
                  v-model="typefav"
                  value="3"
                />
                Movie </label
              ><br /><br />
              <button value="Submit" type="submit" class="button signUp">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
 import MainNavbar from "../components/MainNavbar.vue";
export default {
  components: {
MainNavbar
  },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      confirm_password: "",
      typefav: [],
      error: {
        username: "",
        password: "",
        email: "",
        confirm_password: "",
        typefav: [],
      },
    };
  },
  methods: {
    handleSubmit(){
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        typefav: this.typefav,
      };
      axios
        .post("http://localhost:3000/signup", data) //ยิงreq ไป port3000/signup
        .then((res) => {
          console.log(res)
          alert("Sign up Success");
          this.$router.push({ path: "/login" }); //successแล้วไปกลับหน้า login
        })
        .catch((err) => {
          console.log(err)
        })
    },
    validateUsername() {  //ตรวจสอบ
      if (this.username.length > 15) {
        this.error.username = "ชื่อต้องมีความยาวไม่เกิน 15 ตัวอักษร";
        return;
      }
      if (this.username === "") {
        this.error.username = "โปรดกรอกชื่อ";
        return;
      }
      this.error.username = "";
    },
    validateEmail() {
      if (this.email === "") {
        this.error.email = "โปรดกรอกอีเมล";
        return;
      }
      this.error.email = "";
    },
    validatePassword() {
      if (this.password === "") {
        this.error.password = "โปรดกรอกรหัสผ่าน";
        return;
      }
      if (this.password.length < 8) {
        this.error.password = "รหัสต้องไม่ต่ำกว่า 8 ตัวอักษร";
        return;
      }
      this.error.password = "";
    },
    validateConfirmPassword() {
      if (this.confirm_password !== this.password) {
        this.error.confirm_password = "รหัสผ่านไม่ตรงกัน";
        return;
      }
      this.error.confirm_password = "";
    },
    submit() {
      if (
        this.username === "" ||
        this.error.username !== "" ||
        this.email === "" ||
        this.error.email !== "" ||
        this.error.password !== "" ||
        this.password === "" ||
        this.error.confirm_password !== "" ||
        this.confirm_password === ""
      ) {
        alert("กรุณาแก้ไข");
        return;
      } else if (this.typefav === 0 || this.typefav > 1) {
        alert("โปรดเลือก Favourite Types หนึ่งประเภท");
      } else {
        this.error.typefav = [];
      }
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        typefav: this.typefav,
      };

      // ส่งคำขอ HTTP POST ไปยังเส้นทาง `/signup` ของ backend
      axios
        .post("http://localhost:3000/signup", data) 
        .then(() => {
          alert("Sign up Success");
          this.$router.push({ path: "/login" });
        })
        .catch((err) => {
          
        });
    },
  },
};
</script>

<style scoped>
form {
  width: 60%;
  position: relative;
  top: 5%;
  right: -25%;
}
.imgRegister {
  max-width: 100%;
  height: auto;
  position: relative;
  top: 30%;
  right: -35%;
}

/* .container {
  display: flex;
  justify-content: center;
}


#register {
  position: relative;
  left: 30%;
} */

@media (max-width: 768px) {
  .columns {
    flex-direction: column;
    align-items: center;
  }

  .imgRegister {
    position: static;
    left: auto;
    transform: none;
    margin-bottom: 20px;
  }

  #register {
    position: static;
    left: auto;
    transform: none;
    width: 100%;
    max-width: 400px;
  }
}
</style>
