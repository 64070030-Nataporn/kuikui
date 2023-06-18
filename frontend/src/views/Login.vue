
<template>
  <div>
    <MainNavbar />
    <div class="container">
      <div class="columns">
        <div class="column">
          <img
            class="imgLogin"
            src="https://media.discordapp.net/attachments/1079116062571892827/1079124129401286797/casual-life-3d-girl-in-sunglasses-sitting-with-guitar-and-showing-v-sign.png"
          />
        </div>
        <div class="column" id="login">
          <form>
            <div class="containerLogin" id="login1">
              <h1 class="title">Login</h1>
              <p class="subtitle is-size-5">
                Doesn’t have account yet?
                <router-link to="/signup">Sign up</router-link>
              </p>
              <p class="txtLogin">Email</p>
              <input
                id="email"
                class="input"
                type="email"
                v-model="email"
                placeholder="Email"
                autocomplete="off"
              /><br /><br />
              <p class="txtPassword">Password</p>
              <input
                id="pwd"
                class="input"
                type="password"
                v-model="password"
                placeholder="Password"
              /><br /><br />
              <button type="submit" @click="submit()" class="button is-primary">
                Sign in
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
import MainNavbar from "@/components/MainNavbar.vue";
// import MainNavbar from "../components/MainNavbar.vue";
export default {
  components: {
    MainNavbar,
  },
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    submit() {
      if (this.email === "" && this.password === "") {
        alert("กรุณากรอก Email และ Password");
        return;
      } else if (this.email === "") {
        alert("กรุณากรอก Email");
        return;
      } else if (this.password === "") {
        alert("กรุณากรอก Password");
        return;
      }

      this.$router.push({ path: "/" });
      const data = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/login", data)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          this.$emit("auth-change");
          alert("Success");
          this.$router.push({ path: "/profile" });
        })
        .catch(() => {
          // จัดการกรณีเกิดข้อผิดพลาด
        });
    },
  },
};
</script>
 
 <style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.imgLogin {
  max-width: 100%;
  height: auto;
  position: relative;
  top: 50%;
}
#login {
  position: relative;
  top: 35%;
}
@media (max-width: 768px) {
  .imgLogin {
    position: static;
    left: auto;
    transform: none;
  }
  #login {
    position: static;
    left: auto;
    transform: none;
  }
}
body {
  width: 100%;
  padding: 0;
  margin: 0;
}
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
 