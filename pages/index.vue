<template>
    <div></div>
</template>

<script>
  const DEFAULT_PERSON_ID = 1;

  export default {
    fetch({redirect}) {
      redirect(`/people/${DEFAULT_PERSON_ID}`);
    }
  }
</script>
