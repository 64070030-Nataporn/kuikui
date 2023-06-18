<template>
  <div id="app">
    <navbar></navbar>

    <!--search-->
    <div
      class="field has-addons container is-flex is-justify-content-center my-5"
    >
      <div class="control has-icons-right">
        <input
          class="input is-normal is-rounded"
          v-model="searchmovie"
          type="text"
          placeholder="Search your movie"
          size="70"
        />
        <span class="icon is-right">
          <i class="fas fa-filter"></i>
        </span>
      </div>
      <div class="control">
        <button class="button is-black is-rounded" @click="getMovie()">
          Search
        </button>
      </div>
    </div>

    <!--categories-->
    <div class="container">
      <div class="columns my-5">
        <div
          class="column is-align-self-center is-justify-content-center is-flex"
        >
          <div
            class="tags are-medium"
            style="cursor: pointer"
          >
            <span @click="selecttype('Drama')" class="tag is-danger">Drama</span>
            <span @click="selecttype('Adventure')" class="tag is-primary">Adventure</span>
            <span @click="selecttype('Sci-Fi')" class="tag is-warning">Sci-Fi</span>
            <span @click="selecttype('Action')" class="tag is-link">Action</span>
            <span @click="selecttype('Fantasy')" class="tag is-success">Fantasy</span>
            <span @click="selecttype('Horror')" class="tag is-link">Horror</span>
            <span @click="selecttype('Other')" class="tag is-dark">Other</span>
          </div>
        </div>
      </div>
    </div>

    <!--collection-->
    <div class="container">
      <h2 class="has-text-centered title">{{ topicmov }}</h2>
      <div v-show="user.role == 'admin'" class="has-text-right mr-5">
        <router-link to="/createmov" class="button is-light is-rounded"> 
          Create New Movie
        </router-link>
      </div>
      <div class="columns has-text-centered m-4 is-multiline">
        <div
          v-for="item in listmov"
          class="column is-one-fifth has-text-centered"
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
                <p>{{ shortHeader(item.director) }}</p>
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
                    @click="putmodal('open', item.movie_id)"
                  >
                    fav
                  </button>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <router-link
                  class="card-footer-item"
                  :to="`/movie/detail/${item.movie_id}`"
                  >Read more...</router-link
                >
                <router-link
                  class="card-footer-item "
                  :to="`/editmovie/${item.movie_id}`"
                  v-show="user.role == 'admin'"
                  >Edit</router-link
                >
              <a v-show="user.role == 'admin'" @click="delmovie(item.movie_id)" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">Add to your list</p>
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
                  <input type="radio" name="answer" v-model="rating" value="5"/>
                  5
                </label>
                <label class="radio">
                  <input type="radio" name="answer" v-model="rating" value="4"/>
                  4
                </label>
                <label class="radio">
                  <input type="radio" name="answer" v-model="rating" value="3"/>
                  3
                </label>
                <label class="radio">
                  <input type="radio" name="answer" v-model="rating" value="2"/>
                  2
                </label>
                <label class="radio">
                  <input type="radio" name="answer" v-model="rating" value="1"/>
                  1
                </label>
              </div>
            </div>
            <div class="column is-2"></div>
          </div>
        </section>
        <footer class="modal-card-foot is-justify-content-center">
          <button class="button is-success" @click="addfavlist(movchoose)">
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
import navbarmov from "../components/navbarmovie.vue";

export default {
    data() {
    return {
      searchmovie: "",
      topicmov: "All Movies",
      listmov: [],
      review: "",
      rating: 0,
      movchoose: 0,
      user: null
    };
  },
    components: {
    navbar: navbarmov,
  },
  mounted() {
    this.getMovie(), this.selecttype(''), this.onAuthChange()
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
    getUser() {
      //  const token = localStorage.getItem('token')
      axios.get("/user/me").then((res) => {
        this.user = res.data;
        console.log(this.user);
      });
    },
    getMovie() {
      axios
        .get("/movie/searchmovie", {
          params: {
            searchmovie: this.searchmovie,
          },
        })
        .then((response) => {
          this.listmov = response.data;
          this.topicmov = "All Movies";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    shortHeader(name) {
      if (name.length > 14) {
        return name.substring(0, 14) + "...";
      }
      return name;
    },
    selecttype(genres) {
        axios
        .get(`/mov/search/${genres}`, {
        })
        .then((response) => {
          this.listmov = response.data;
          this.topicmov = genres;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addfavlist(movie_id) {
      axios
        .post(`/favmovie/${movie_id}`, {
          review: this.review,
          rating: this.rating,
          user_id: this.user.user_id
        })
        .then((response) => {
          console.log(response)
          alert(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    putmodal(state, select) {
      const modal = document.getElementById("modal");

      if (state == "open") {
        modal.classList.add("is-active");
        this.movchoose = select;
      } else {
        modal.classList.remove("is-active");
        this.movchoose = "";
      }
    },
    delmovie(movie_id) {
      const result = confirm(`Are you sure you want to delete this movie`);
      if (result) {
        axios
          .delete(`/movie/${movie_id}`)
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
}
</script>

<style>

</style>