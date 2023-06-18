<template>
  <div id="app">
    <navbar></navbar>
    <div class="container">
      <h2 class="has-text-centered title my-5">Create New Song</h2>
      <section class="has-text-left my-5">
        <input
          class="mb-5"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          @change="selectImages"
        />

        <div
          v-if="images"
          class="columns is-multiline is-justify-content-center"
        >
          <div
            v-for="(image, index) in images"
            :key="image.id"
            class="column is-one-quarter"
          >
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="showSelectImage(image)" alt="Placeholder image" />
                </figure>
              </div>
              <footer class="card-footer">
                <a
                  @click="deleteSelectImage(index)"
                  class="card-footer-item has-text-danger"
                  >Delete</a
                >
              </footer>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="field column is-2">
            <label class="label has-text-left">Genres: </label>
            <div class="select is-rounded">
              <select v-model="genres">
                <option value="R&B" class="tag is-danger">R&B</option>
            <option value="POP" class="tag is-primary">POP</option>
            <option value="HIPHOP" class="tag is-warning">HIPHOP</option>
            <option value="ROCK" class="tag is-link">ROCK</option>
            <option value="KPOP" class="tag is-success">KPOP</option>
            <option value="OTHER" class="tag is-dark">OTHER</option>
              </select>
            </div>
          </div>
          <div class="column is-5">
            <label class="label has-text-left">Name: </label>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Name"
                  v-model="$v.name.$model"
                  :class="{ 'is-danger': $v.name.$error }"
                />
              </div>
              <template v-if="$v.name.$error">
            <p class="help is-danger" v-if="!$v.name.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.name.minLength">
              Name must be at least 1 letters
            </p>
            <p class="help is-danger" v-if="!$v.name.maxLength">
              Name must not more than 25 letters
            </p>
          </template>
            </div>
          </div>
          <div class="column is-5">
            <label class="label has-text-left">Artist: </label>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="artist"
                  v-model="$v.artist.$model"
                  :class="{ 'is-danger': $v.artist.$error }"
                />
              </div>
              <template v-if="$v.artist.$error">
            <p class="help is-danger" v-if="!$v.artist.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.artist.minLength">
              Name must be at least 2 letters
            </p>
          </template>
            </div>
          </div>
        </div>
        <div class="field is-grouped is-justify-content-center">
          <div class="control">
            <button class="button is-link" @click="submitBlog()">Submit</button>
          </div>
          <div class="control">
            <button @click="$router.go(-1)" class="button is-link is-light">
              Cancel
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import navbarsong from "../components/navbarsong.vue";
import { required, email, minLength, sameAs, maxLength, alpha, url, requiredIf} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      images: [],
      genres: "",
      name: "",
      artist: "",
    };
  },
  components: {
    navbar: navbarsong,
  },
  validations: {
      name: {
      required: required,
      minLength: minLength(1),
      maxLength: maxLength(25),
    },
    artist: {
      required: required,
      minLength: minLength(2)
    }
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
    submitBlog() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("genres", this.genres);
      formData.append("artist", this.artist);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });
      axios
        .post("/createsong", formData)
        .then((res) => this.$router.push({ name: "catsongpage" }))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
</style>