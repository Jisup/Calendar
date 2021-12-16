<template>
  <div class="calendar">
    <div class="title">
      <div class="prev-btn">&lt;</div>
      <div class="date">2021.09</div>
      <div class="next-btn">&gt;</div>
    </div>
    <div class="week">
      <div class="day">일</div>
      <div class="day">월</div>
      <div class="day">화</div>
      <div class="day">수</div>
      <div class="day">목</div>
      <div class="day">금</div>
      <div class="day">토</div>
    </div>
  </div>
</template>

<script>
import "@/style/Month.css";
export default {
  name: "month",
};
</script>
