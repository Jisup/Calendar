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

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 날짜 넣기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const setDays = (_today) => {
      const _today_year = _today.getFullYear(); // 현재 년도 가져오기
      const _today_month = _today.getMonth() + 1; // 현재 월 가져오기
      const _today_first = new Date(_today_year, _today_month - 1, 1); // 현재 월 1일
      const _today_last = new Date(_today_year, _today_month, 0); // 현재 월 마지막일
      const _yet_last = new Date(_today_year, _today_month - 1, 0); // 현재 전월 마지막일

      for (let i = _today_first.getDate(); i <= _today_last.getDate(); i++) {
        state.days.push(i); // 전체 일 수 날짜 넣기
      }
      for (let i = 0; i < _today_first.getDay(); i++) {
        state.days.unshift(_yet_last.getDate() - i); // 모자란 앞 일 채우기
      }
      for (let i = 1; i <= 6 - _today_last.getDay(); i++) {
        state.days.push(i); // 모자란 뒷 일 채우기
      }
      console.log(state.days);
    };
    setDays(_today);

    onMounted(() => {
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 데이터 셋 저장하기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      const setRecruitmentData = (_recruitment_data) => {
        const _now_year = _today.getFullYear();
        const _set_date = [
          ["Jan", _now_year + "-01"],
          ["Feb", _now_year + "-02"],
          ["Mar", _now_year + "-03"],
          ["Apr", _now_year + "-04"],
          ["May", _now_year + "-05"],
          ["Jun", _now_year + "-06"],
          ["Jul", _now_year + "-07"],
          ["Aug", _now_year + "-08"],
          ["Sep", _now_year + "-09"],
          ["Oct", _now_year + "-10"],
          ["Nov", _now_year + "-11"],
          ["Dec", _now_year + "-12"],
        ];
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
