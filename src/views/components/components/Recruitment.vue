<template>
  <div class="recruit-modal">{{ state }}-{{ name }}</div>
</template>
<script>
export default {
  name: "recruitment",
  props: {
    id: Number,
    name: String,
    content: String,
    image: String,
    start_time: String,
    end_time: String,
    state: String,
  },
  setup() {},
};
</script>
<style lang=""></style>
