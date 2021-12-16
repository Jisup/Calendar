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
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import DayS from "@/views/components/Day.vue";
export default {
  name: "month",
  components: {
    DayS,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      days: [],
    });
    const _today = new Date(); // 현재 날짜
    const _ary_month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 날짜 넣기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const setDays = (_today) => {
      const _today_year = _today.getFullYear(); // 현재 년도 가져오기
      const _today_month = _today.getMonth() + 1; // 현재 월 가져오기
      const _today_first = new Date(_today_year, _today_month - 1, 1); // 현재 월 1일
      const _today_day_last = new Date(_today_year, _today_month, 0); // 현재 월 마지막일
      const _prev_day_last = new Date(_today_year, _today_month - 1, 0); // 현재 전월 마지막일

      console.log(_today_month);

      const _prev_month_data = "";
      const _today_month_data = "";
      const _next_month_data = "";

      for (
        let i = _today_first.getDate();
        i <= _today_day_last.getDate();
        i++
      ) {
        state.days.push(i); // 전체 일 수 날짜 넣기
      }
      for (let i = 0; i < _today_first.getDay(); i++) {
        state.days.unshift(_prev_day_last.getDate() - i); // 모자란 앞 일 채우기
      }
      for (let i = 1; i <= 6 - _today_day_last.getDay(); i++) {
        state.days.push(i); // 모자란 뒷 일 채우기
      }
      console.log(state.days);
    };
    setDays(_today);

    // 1. 일수에 맞춰서 데이터 넣기
    // 2. 어떻게 넣을꺼니?
    // 3. [{ year: year, month: month, day:day, start, end}]

    onMounted(() => {
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 데이터 셋 저장하기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      const setRecruitmentData = (_recruitment_data) => {
        const _now_year = _today.getFullYear();
        const _set_dates = [];
        for (let i = 1; i <= 12; i++) {
          i > 9
            ? _set_dates.push([_ary_month[i - 1], _now_year + "-" + i])
            : _set_dates.push([_ary_month[i - 1], _now_year + "-0" + i]);
        }
        console.log(_set_dates);
        for (let i = 0; i < _set_date.length; i++) {
          const _month_start = _recruitment_data.filter((_item) => {
            return _item.start_time.includes(_set_date[i][1]);
          });
          const _month_end = _recruitment_data.filter((_item) => {
            return _item.end_time.includes(_set_date[i][1]);
          });
          store.commit("root/setMonth" + _set_date[i][0], {
            start: _month_start,
            end: _month_end,
            year: _now_year,
          });
        }
      };
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 데이터 셋 받아오기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      const getRecruitmentData = async () => {
        await store.dispatch("root/getRecruitmentData").then((response) => {
          setRecruitmentData(response.data);
        });
      };
      getRecruitmentData();
    });

    return { state };
  },
};
</script>
