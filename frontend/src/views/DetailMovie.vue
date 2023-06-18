<template>
<div>
    <navbar></navbar>
<div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">{{ error }}</div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">{{ movie[0].name_movie }}</p>
      </div>
    </section>
    <section class="section">
      <div class="content">
        <div class="card has-background-light">
          <div class="card-image pt-5">
            <div class="columns">
              <div class="column">
                <figure class="image">
                  <img
                    :src="'http://localhost:3000/'+ movie[0].file_path"
                    alt="Placeholder image"
                    style="height: 350px; width: 50%; object-fit: cover;"
                  />
                </figure>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="content">{{ movie[0].taglines }}</div>
            <div class="content">{{ "From " + movie[0].director }}</div>
          </div>
          <footer class="card-footer">
            <router-link class="card-footer-item" to="/catmovie">To Home Page</router-link>
          </footer>
        </div>
      </div>
    </section>
  </div>
</div>

</template>

<script>
import navbarmov from "../components/navbarmovie.vue";
import axios from '@/plugins/axios'

export default {
  props: ["user"],
  data() {
    return {
      movie: [],
      error: null,
    };
  },
  components: {
    navbar: navbarmov,
  },
  mounted() {
    this.getBlogDetail(this.$route.params.movie_id);
  },
  methods: {
    getBlogDetail(movie_id) {
      axios
        .get(`/moviepage/${movie_id}`)
        .then((response) => {
            console.log(response.data)
          this.movie = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    isBlogOwner(blog) {
      if (!this.user) return false;
      return blog.create_by_id === this.user.id || this.user.role === "admin";
    },
  },
};
</script>