<template>
  <ul class="people-list">
    <li v-for="(item, index) of items" :key="index" class="people-list__item">
      <nuxt-link :to="`people/${item.id}`">
        {{ item.name }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'people-list',
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .people-list {
    padding: 0;
    margin: 0;
    &__item {

    }
  }
</style>
