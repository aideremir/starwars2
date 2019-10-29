<template>
  <div class="row">
    <nav class="col-md-2 d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li v-for="(person, index) of people" :key="index" class="nav-item">
            <nuxt-link :to="`/people/${person.id}`" class="nav-link">
              <i class="fa"
                 :class="{
                 'fa-female': person.gender === 'female',
                 'fa-male': person.gender === 'male',
                 'fa-android': person.gender === 'n/a'
                 }"
              >
              </i>
              {{ person.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <nuxt-child />
    </main>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    created() {
      this.fetchPeople()
    },
    computed: {
      ...mapState(['people'])
    },
    methods: {
      ...mapActions(['fetchPeople'])
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";

  body {
    font-size: .875rem;
  }

  /*
   * Sidebar
   */

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  @supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar-sticky {
      position: -webkit-sticky;
      position: sticky;
    }
  }

  .sidebar .nav-link {
    font-weight: 500;
    color: $primary;
  }

  .sidebar .nav-link.nuxt-link-active {
    color: $secondary;
  }

  .sidebar .nav-link:hover .feather,
  .sidebar .nav-link.active .feather {
    color: inherit;
  }

  .sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
  }

  /*
   * Content
   */

  [role="main"] {
    padding-top: 133px; /* Space for fixed navbar */
  }

  @media (min-width: 768px) {
    [role="main"] {
      padding-top: 48px; /* Space for fixed navbar */
    }
  }

  /*
   * Navbar
   */

  .navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
  }

  .navbar .form-control {
    padding: .75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }

  .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .1);
  }

  .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
  }
</style>

