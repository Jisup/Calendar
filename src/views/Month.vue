<template>
  <div class="calendar">
    <div class="calendar-title">
      <div class="calendar-title-prev-btn">&lt;</div>
      <div class="calendar-title-date">2021.09</div>
      <div class="calendar-title-next-btn">&gt;</div>
    </div>
    <div class="month">
      <div class="week">
        <div class="day">일</div>
        <div class="day">월</div>
        <div class="day">화</div>
        <div class="day">수</div>
        <div class="day">목</div>
        <div class="day">금</div>
        <div class="day">토</div>
      </div>
      <div class="daylist">
        <day-s v-for="(day, index) in 31" :key="index" :date="day"> </day-s>
      </div>
    </div>
  </div>
</template>

<script>
import "@/style/Month.css";
import DayS from "@/views/components/Day.vue";
export default {
  name: "month",
  components: {
    DayS,
  },
};
</script>
