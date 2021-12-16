<template>
  <div class="days">
    <div class="day-title">{{ day }}</div>
    <div class="day-content">뭐가들어갈까요??</div>
  </div>
</template>
<script>
import "@/style/Day.scss";
export default {
  name: "day",
  props: {
    year: Number,
    month: Number,
    day: Number,
    start: Array,
    end: Array,
  },
  setup(props) {
    console.log(props);
  },
};
</script>
