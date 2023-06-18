<template>
        <div class="columns">
      <!--left side about profile user -->
      <div class="column is-one-quarter has-background-warning-light">
        <div class="has-text-centered is-align-self-center">
          <div class="is-justify-content-center">
            <figure class="image is-align-self-center is-justify-content-center is-flex">
              <img
              class="is-rounded"
                style="width: 75%; height: 250px"
                src="http://localhost:3000/uploads/profile-user.jpg"
              />
            </figure>
          </div>
          <div class="tags are-medium mt-4 is-align-self-center is-justify-content-center is-flex" style="cursor: pointer">
            <span class="tag is-danger is-light">Book</span>
          </div>
          <div>
            <p class="title is-4 headertext mt-3">Inumaki</p>
            <p class="textsmall has-text-left pl-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero,
              praesentium. Quisquam nisi quibusdam ex rem! Dolor, fugit
              dignissimos vero maxime earum veritatis harum autem explicabo
              repellat, nesciunt quae sit error!
            </p>
          </div>

          <button class="button is-danger mt-4" onclick="gologout()">Log out</button>
        </div>
      </div>

      <!--right side about info and list favorite-->
      <div class="column is-three-quarter has-background-info-light">
        <!--say hi-->
        <p class="title is-size-1 has-text-centered">Hi</p>

        <!--all room-->
        <div>
          <p class="subtitle is-size-4 has-text-centered">Your Activities</p>

          <div class="columns">
            <!--book room-->
            <div class="column is-flex is-justify-content-center">
              <div class="card" style="width: 50%">
                <header class="card-header">
                  <div class="card-header-icon">
                    <span class="card-header-icon icon">
                      <i class="fas fa-book"></i>
                    </span>
                  </div>
                  <p class="card-header-title">Book-Club</p>
                </header>
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      src="http://localhost:3000/uploads/Fall Reading List.jpg"
                    />
                  </figure>
                </div>
                <footer class="card-footer quotes">
                    <router-link to="/bookpage" class="card-footer-item">
                    To Book Club
                    </router-link>
                </footer>
              </div>
            </div>

            <!--music room-->
            <div class="column is-flex is-justify-content-center">
              <div class="card" style="width: 50%">
                <header class="card-header">
                  <div class="card-header-icon">
                    <span class="icon">
                      <i class="fas fa-music"></i>
                    </span>
                  </div>
                  <p class="card-header-title">Music-Club</p>
                </header>
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      src="http://localhost:3000/uploads/all my pins에 있는 smth_intheway님의 핀 _ 가을 미학, 그런지 패션, 컨셉 사진.jpg"
                    />
                  </figure>
                </div>
                <footer class="card-footer quotes">
                  <router-link to="/songpage" class="card-footer-item">
                    To Song Club
                    </router-link>
                </footer>
              </div>
            </div>

            <!--movie room-->
            <div class="column is-flex is-justify-content-center">
              <div class="card" style="width: 50%">
                <header class="card-header">
                  <div class="card-header-icon">
                    <span class="icon">
                      <i class="fas fa-video"></i>
                    </span>
                  </div>
                  <p class="card-header-title">Movie-Club</p>
                </header>
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      src="http://localhost:3000/uploads/Seattle’s Best Cheap Movie Theaters — Real Estate Gals.jpg"
                    />
                  </figure>
                </div>
                <footer class="card-footer quotes">
                  <router-link to="/moviepage" class="card-footer-item">
                    To Movie Club
                    </router-link>
                </footer>
              </div>
            </div>
          </div>
        </div>

        <!--your list-->
        <div v-if="type_fav==1" class="columns has-text-centered m-4 is-multiline">
        <div
          v-for="item in alllist"
          class="column is-one-fifth has-text-centered"
          :key="item.book_id"
        >
          <!--list book per each-->

          <div class="card">
            <div class="card-image">
              <figure class="image is-square">
                <img class="px-4" :src="imagePath(item.file_path)" />
              </figure>
            </div>

            <div class="card-content">
              <div class="content has-text-left">
                <p class="title is-5 headertext">
                  {{ shortHeader(item.name_book) }}
                </p>
                <p>{{ item.author }}</p>
                <div
                  class="is-flex is-justify-content-space-between is-align-items-center"
                >
                  <span class="icon" v-for="i in 5" :key="i">
                    <i
                      v-show="i <= Number(item.rating)"
                      class="fas fa-star has-text-warning"
                    ></i>
                    <i
                      v-show="i > Number(item.rating)"
                      class="fas fa-star has-text-black"
                    ></i>
                  </span>
                  <button
                    class="button is-danger is-rounded"
                    @click="putmodal('open', item.book_id)"
                  >
                    fav
                  </button>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <router-link
                  class="card-footer-item "
                  :to="`/book/detail/${item.book_id}`"
                  >Read more...</router-link
                >
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
      </div>
      </div>
    </div>

</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      alllist: [],
      user: null,
      tok: ""
    };
  },
  mounted () {
     this.onAuthChange()
   },
   methods: {
     onAuthChange() {
       const token = localStorage.getItem('token')
       if (token) {
         this.getUser()
       }
       else{
        this.$router.push({path: '/login'})
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

<style>
</style>