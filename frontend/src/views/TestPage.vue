<template>
  <div>
    <MainNavbar />
    <div class="columns">
      <!--left side about profile user -->
      <div class="column is-one-quarter has-background-warning-light">
        <div class="has-text-centered is-align-self-center">
          <div class="is-justify-content-center mt-3">
            <figure class="image is-align-self-center is-justify-content-center is-flex">
              <img
              class="is-rounded"
                style="width: 75%; height: 250px"
                src="http://localhost:3000/uploads/profile-user.jpg"
              />
            </figure>
          </div>
          <div class="tags are-medium mt-4 is-align-self-center is-justify-content-center is-flex" style="cursor: pointer">
            <span v-if="user.type_fav == 1 && user.role != 'admin'" class="tag is-danger is-light">Book</span>
            <span v-else-if="user.type_fav == 2 && user.role != 'admin'" class="tag is-info is-light">Song</span>
            <span v-else-if="user.type_fav == 3 && user.role != 'admin'" class="tag is-success is-light">Movie</span>
            <span v-else-if="user.role == 'admin'" class="tag is-dark is-light">Admin</span>
          </div>
          <div>
            <p class="title is-4 headertext mt-3">{{user.username}}</p>
            <p class="textsmall has-text-left pl-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero,
              praesentium. Quisquam nisi quibusdam ex rem! Dolor, fugit
              dignissimos vero maxime earum veritatis harum autem explicabo
              repellat, nesciunt quae sit error!
            </p>
          </div>

        </div>
      </div>

      <!--right side about info and list favorite-->
      <div class="column is-three-quarter has-background-info-light">
        <!--say hi-->
        <p class="title is-size-1 has-text-centered">{{ "Hi " + user.username }}</p>

        <!--all room-->
        <div>
          <p class="subtitle is-size-4 has-text-centered">Your Activities</p>

          <div class="columns">
            <!--book room-->
            <div v-if="user.type_fav === 1 || user.role == 'admin'" class="column is-flex is-justify-content-center">
              <div class="card">
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
            <div v-if="user.type_fav === 2 || user.role == 'admin'" class="column is-flex is-justify-content-center">
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
            <div v-if="user.type_fav === 3 || user.role == 'admin'" class="column is-flex is-justify-content-center">
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
          <button v-if="user.role != 'admin'" class="button" @click="getalllist()">list</button>
        </div>

        <!--your list-->
        <div v-if="user.type_fav == 1" class="columns has-text-centered m-4 is-multiline">
        <div
          v-for="item in alllist"
          class="column is-one-quarter has-text-centered"
          :key="item.book_id"
        >
          <!--list per each-->

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
                <p>{{ item.review }}</p>
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
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <router-link
                  class="card-footer-item "
                  :to="`/book/detail/${item.book_id}`"
                  >Read more...</router-link
                >
                <a @click="putmodal('open', item.book_id, 1)" class="card-footer-item">Edit</a>
              <a class="card-footer-item" @click="delfavlist(item.book_id, 1)">Delete</a>
            </footer>
          </div>
        </div>
      </div>
      <!--music-->
      <div v-if="user.type_fav == 2" class="columns has-text-centered m-4 is-multiline">
        <div
          v-for="item in alllist"
          class="column is-one-quarter has-text-centered"
          :key="item.song_id"
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
                  {{ shortHeader(item.name_song) }}
                </p>
                <p>{{ item.review }}</p>
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
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <router-link
                  class="card-footer-item"
                  :to="`/song/detail/${item.song_id}`"
                  >Read more...</router-link
                >
                <a @click="putmodal('open', item.song_id, 2)" class="card-footer-item">Edit</a>
              <a class="card-footer-item" @click="delfavlist(item.song_id, 2)">Delete</a>
            </footer>
          </div>
        </div>
      </div>

      <!--movie-->
      <div v-if="user.type_fav == 3" class="columns has-text-centered m-4 is-multiline">
        <div
          v-for="item in alllist"
          class="column is-one-quarter has-text-centered"
          :key="item.movie_id"
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
                  {{ shortHeader(item.name_movie) }}
                </p>
                <p>{{ item.review }}</p>
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
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <router-link
                  class="card-footer-item"
                  :to="`/movie/detail/${item.movie_id}`"
                  >Read more...</router-link
                >
              <a @click="putmodal('open', item.movie_id, 3)" class="card-footer-item">Edit</a>
              <a class="card-footer-item" @click="delfavlist(item.movie_id, 3)">Delete</a>
            </footer>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="modal" id="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">Edit your list</p>
          <button
            id="modalclose"
            class="delete"
            aria-label="close"
            @click="putmodal('close')"
          ></button>
        </header>
        <section class="modal-card-body has-text-centered">
          <div class="columns">
            <div class="column is-2"></div>
            <div class="column is-8">
              <label class="label has-text-left">Review: </label>
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="review"
                    v-model="review"
                  />
                </div>
              </div>
            </div>
            <div class="column is-2"></div>
          </div>
          <div class="columns">
            <div class="column is-2"></div>
            <div class="column is-8">
              <label class="label has-text-left">Rating: </label>
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    v-model="rating"
                    value="5"
                  />
                  5
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    v-model="rating"
                    value="4"
                  />
                  4
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    v-model="rating"
                    value="3"
                  />
                  3
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    v-model="rating"
                    value="2"
                  />
                  2
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    v-model="rating"
                    value="1"
                  />
                  1
                </label>
              </div>
            </div>
            <div class="column is-2"></div>
          </div>
        </section>
        <footer class="modal-card-foot is-justify-content-center">
          <button class="button is-success" @click="editfavlist(choose, favtype)">
            Save changes
          </button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
    
    <script>
import axios from "@/plugins/axios";
import MainNavbar from "@/components/MainNavbar.vue";

// @ is an alias to /src
export default {
  name: "ProfilPage",
  components: {
    MainNavbar,
  },
  data() {
    return {
      alllist: [],
      user: null,
      review: "",
      rating: 0,
      choose: 0,
      favtype: 0
    };
  },
  mounted() {
    this.onAuthChange()
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    getalllist() {
      axios
        .get(`/user/favlist/${this.user.email}`)
        .then((response) => {
          this.alllist = response.data
          alert("success")
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUser() {
      //  const token = localStorage.getItem('token')
      axios.get("http://localhost:3000/user/me").then((res) => {
        this.user = res.data;
        console.log(this.user);
      });
    },
    LogOut() {
      localStorage.removeItem("token");
      location.reload();
    },
    shortHeader(name) {
      if (name.length > 14) {
        return name.substring(0, 14) + "...";
      }
      return name;
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    putmodal(state, select, type) {
      const modal = document.getElementById("modal");

      if (state == "open") {
        modal.classList.add("is-active");
        this.choose = select;
        this.favtype = type;
      } else {
        modal.classList.remove("is-active");
        this.choose = "";
        this.favtype = "";
      }
    },
    editfavlist(select, type) {
      axios
        .put(`/fav/${select}`, {
          review: this.review,
          rating: this.rating,
          user_id: this.user.user_id,
          type_fav: type
        })
        .then((response) => {
          console.log(response);
          alert(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    delfavlist(select, type) {
      const result = confirm(`Are you sure you want to delete this?`);
      if (result) {
        axios
          .delete(`/fav/${select}/${this.user.user_id}/${type}`)
          .then((response) => {
            console.log(response);
            alert("success")
          })
          .catch((error) => {
            this.error = error.message;
          });
      }
    }
  },
};
</script>
    