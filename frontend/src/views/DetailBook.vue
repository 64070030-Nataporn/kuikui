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
        <p class="title">{{ book[0].name_book }}</p>
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
                    :src="'http://localhost:3000/'+ book[0].file_path"
                    alt="Placeholder image"
                    style="height: 350px; width: 50%; object-fit: cover;"
                  />
                </figure>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="content">{{ book[0].describe }}</div>
            <div class="content">{{ "From " + book[0].author }}</div>
          </div>
          <footer class="card-footer">
            <router-link class="card-footer-item" to="/catbook">To Home Page</router-link>
          </footer>
        </div>
      </div>
    </section>
  </div>
</div>
  
</template>

<script>
import axios from '@/plugins/axios'
import navbarbook from "../components/navbarbook.vue";


export default {
  props: ["user"],
  data() {
    return {
      book: {},
      error: null,
    };
  },
  components: {
    navbar: navbarbook,
  },
  mounted() {
    this.getBlogDetail(this.$route.params.book_id);
  },
  methods: {
    getBlogDetail(book_id) {
      axios
        .get(`/bookpage/${book_id}`)
        .then((response) => {
          this.book = response.data;
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