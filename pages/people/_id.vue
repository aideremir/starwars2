<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <h1 class="h2">{{ person.name }}</h1>
    </div>
    <section class="mb-3">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Height</th>
          <th scope="col">Mass</th>
          <th scope="col">Hair Color</th>
          <th scope="col">Skin Color</th>
          <th scope="col">Eye Color</th>
          <th scope="col">Birth Year</th>
          <th scope="col">Gender</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ person.height }}</td>
          <td>{{ person.mass }}</td>
          <td>{{ person.hair_color }}</td>
          <td>{{ person.skin_color }}</td>
          <td>{{ person.eye_color }}</td>
          <td>{{ person.birth_year }}</td>
          <td>{{ person.gender }}</td>
        </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3>Movies <i v-if="moviesLoading" class="fa fa-spinner fa-spin"></i></h3>
      <table v-if="!moviesLoading" class="table">
        <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Director</th>
          <th scope="col">Producer</th>
          <th scope="col">Release Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(movie, index) of movies" :key="index">
          <td><b>{{ movie.title }}</b></td>
          <td>{{ movie.director }}</td>
          <td>{{ movie.producer }}</td>
          <td>{{ movie.release_date }}</td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    validate({ params }) {
      return /^\d+$/.test(params.id)
    },
    fetch({ store, error, params }) {
      return store.dispatch('fetchPeople').then(() => {
        if (!store.getters.getPersonById(params.id)) {
          return error({ statusCode: 404, message: 'Person not found' })
        }
      })
    },
    data() {
      return {
        movies: [],
        moviesLoading: false
      }
    },
    mounted() {
      this.loadMovies();
    },
    watch: {
      person(value) {
        this.loadMovies();
      }
    },
    computed: {
      person() {
        return this.$store.getters.getPersonById(this.$route.params.id)
      }
    },
    methods: {
      loadMovies() {
        this.movies = [];
        this.moviesLoading = true;
        axios.all(this.person.films.map(filmUrl => axios.get(filmUrl))).then(res => {
          res.forEach(filmRes => {
            this.movies.push(filmRes.data);
          })
          this.moviesLoading = false;
        }).catch(error => {
          this.moviesLoading = false;
        })
      }
    }
  }
</script>
