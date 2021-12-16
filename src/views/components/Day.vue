<template>
  <div class="days">
    <div class="day-title">{{ day }}</div>
    <div class="day-content">
      <recruit-ment></recruit-ment>
    </div>
  </div>
</template>
<script>
import "@/style/Day.scss";
import RecruitMent from "./components/Recruitment.vue";
export default {
  name: "day",
  components: {
    RecruitMent,
  },
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
