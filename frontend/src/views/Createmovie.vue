<template>
  <div id="app">
    <navbar></navbar>
    <div class="container">
      <h2 class="has-text-centered title my-5">Create New Movie</h2>
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
                <option value="Drama" class="tag is-danger">Drama</option>
                <option value="Adventure" class="tag is-primary">
                  Adventure
                </option>
                <option value="Sci-Fi" class="tag is-warning">Sci-Fi</option>
                <option value="Action" class="tag is-link">Action</option>
                <option value="Fantasy" class="tag is-success">Fantasy</option>
                <option value="Horror" class="tag is-link">Horror</option>
                <option value="Other" class="tag is-dark">Other</option>
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
                  placeholder="Name" :class="{ 'is-danger': $v.name.$error }" 
                  v-model="$v.name.$model"
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
            <label class="label has-text-left">Director: </label>
            <div class="field">
              <div class="control">
                <input :class="{ 'is-danger': $v.director.$error }"
                  class="input"
                  type="text"
                  placeholder="Director"
                  v-model="$v.director.$model"
                />
              </div>
              <template v-if="$v.director.$error">
            <p class="help is-danger" v-if="!$v.director.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.director.minLength">
              Name must be at least 2 letters
            </p>
          </template>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <label class="label has-text-left">Taglines: </label>
            <div class="field">
              <div class="control">
                <textarea :class="{ 'is-danger': $v.taglines.$error }"
                v-model="$v.taglines.$model"
                  class="textarea"
                  placeholder="taglines"
                  
                ></textarea>
              </div>
              <template v-if="$v.taglines.$error">
            <p class="help is-danger" v-if="!$v.taglines.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.taglines.minLength">
              taglines must be at least 30 letters
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
import navbarmovie from "../components/navbarmovie.vue";
import { required, email, minLength, sameAs, maxLength, alpha, url, requiredIf} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      images: [],
      genres: "",
      name: "",
      director: "",
      taglines: "",
    };
  },
  components: {
    navbar: navbarmovie,
  },
  validations: {
      name: {
      required: required,
      minLength: minLength(1),
      maxLength: maxLength(25),
    },
    director: {
      required: required,
      minLength: minLength(2)
    },
    taglines: {
      required: required,
      minLength: minLength(30)
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
      formData.append("director", this.director);
      formData.append("taglines", this.taglines);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });
      console.log(formData);
      axios
        .post("/createmovie", formData)
        .then((res) => this.$router.push({ name: "catmoviepage" }))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
</style>