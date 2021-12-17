<template>
  <div class="recruit-title">{{ state }}-{{ name }}</div>
</template>
<script>
import "@/style/Recruitment.css";
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
