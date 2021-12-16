<template>
  <div class="days">
    <div class="day-title">{{ date }}</div>
    <div class="day-content">뭐가들어갈까요??</div>
  </div>
</template>
<script>
import "@/style/Day.scss";
export default {
  name: "day",
  props: {
    date: Number,
  },
  setup(props) {
    console.log(props.date);
  },
};
</script>
