<template>
  <div class="person-card">
    <h1>{{ person.name }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'person-card',
    props: {
      person: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
