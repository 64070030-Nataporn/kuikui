<template>
  <div id="app">
    <navbar></navbar>
    <div class="container">
        <h2 class="has-text-centered title my-5">Edit Book</h2>
    <section class="has-text-left my-5">
      <input
        class="mb-5"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        @change="selectImages"
      />

      <div v-if="images" class="columns is-multiline is-justify-content-center">
        <div v-for="(image, index) in images" :key="image.id" class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
              </figure>
            </div>
            <footer class="card-footer">
              <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">Delete</a>
            </footer>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="field column is-2">
          <label class="label has-text-left">Genres: </label>
          <div class="select is-rounded">
            <select v-model="genres">
              <option value="Romance">Romance</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Manga">Manga</option>
              <option value="Mystery">Mystery</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div class="column is-5">
          <label class="label has-text-left">Name: </label>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Name" v-model="name" />
            </div>
          </div>
        </div>
        <div class="column is-5">
          <label class="label has-text-left">Author: </label>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Author" v-model="author"/>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <label class="label has-text-left">Description: </label>
          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                placeholder="description"
                v-model="description"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-grouped is-justify-content-center">
        <div class="control">
          <button class="button is-link" @click="submitBook()">Submit</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">Cancel</button>
        </div>
      </div>
      
    </section>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import navbarbook from "../components/navbarbook.vue";

export default {
    data() {
        return {
            images: [],
            genres: "",
            name: "",
            author: "",
            description: "",
            book_id: "",
            book: []
        }
    },
    components: {
    navbar: navbarbook,
    },
    mounted() {
    this.book_id =  this.$route.params.book_id
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submitBook() {
      let formData = new FormData();
      formData.append("genres", this.genres);
      formData.append("name", this.name);
      formData.append("author", this.author);
      formData.append("description", this.description);

      if (this.images.length > 0) {
        this.images.forEach((image) => {
        formData.append("myImage", image);
      });
      }
      axios
        .put(`/editbook/${this.book_id}`, formData)
        .then((res) => this.$router.push({name: 'catpage'}))
        .catch((e) => console.log(e.response.data));
    }
  }
};
</script>

<style>
</style>