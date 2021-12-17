<template lang="">
  <div class="calendar">
    <div class="calendar-title">
      <div class="calendar-title-prev-btn" @click="prevBtn">&lt;</div>
      <div class="calendar-title-date">{{ state.year }}</div>
      <div class="calendar-title-next-btn" @click="nextBtn">&gt;</div>
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
        <day-s
          v-for="(data, index) in state.datas"
          :key="'days' + index"
          :year="data.year"
          :month="data.month"
          :day="data.day"
          :start="data.start"
          :end="data.end"
          @open="openModal"
        >
        </day-s>
      </div>
    </div>
    <Modal
      v-if="state.modal"
      :modal_data="state.modal_data"
      @close="closeModal"
    ></Modal>
  </div>
</template>

<script>
import "@/style/Month.css";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import DayS from "@/views/components/Day.vue";
import Modal from "@/views/components/components/components/Modal.vue";
export default {
  name: "month",
  components: {
    DayS,
    Modal,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      year: "",
      days: [],
      datas: [],
      modal: false,
      modal_data: {},
    });
    const _today = new Date("2021-09-01"); // 현재 날짜
    const _today_month = _today.getMonth() + 1; // 현재 월
    state.year =
      _today.getFullYear() +
      "." +
      (_today_month < 10 ? "0" + _today_month : _today_month);
    store.commit("root/setToday", _today);
    store.commit("root/setSelectDay", _today);
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
      state.days = [];
      const _today_year = _today.getFullYear(); // 현재 년도 가져오기
      const _today_month = _today.getMonth() + 1; // 현재 월 가져오기
      const _today_first = new Date(_today_year, _today_month - 1, 1); // 현재 월 1일
      const _today_day_last = new Date(_today_year, _today_month, 0); // 현재 월 마지막일
      const _prev_day_last = new Date(_today_year, _today_month - 1, 0); // 현재 전월 마지막일
      // 전체 일 수 날짜 넣기
      for (let i = 1; i <= _today_day_last.getDate(); i++) {
        let data = {
          year: _today_year,
          month: _today_month,
          day: i,
        };
        state.days.push(data);
      }
      // 모자란 앞 일 채우기
      for (let i = 0; i < _today_first.getDay(); i++) {
        let _prev_year = _today_year;
        let _prev_month = _today_month - 1;
        if (_prev_month < 1) {
          _prev_year = _today_year - 1;
          _prev_month = 12;
        }
        let data = {
          year: _prev_year,
          month: _prev_month,
          day: _prev_day_last.getDate() - i,
        };
        state.days.unshift(data);
      }
      // 모자란 뒷 일 채우기
      for (let i = 1; i <= 6 - _today_day_last.getDay(); i++) {
        let _next_year = _today_year;
        let _next_month = _today_month + 1;
        if (_next_month > 12) {
          _next_year = _today_year + 1;
          _next_month = 1;
        }
        let data = {
          year: _next_year,
          month: _next_month,
          day: i,
        };
        state.days.push(data);
      }
    };
    setDays(_today);

    onMounted(() => {
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 데이터 셋 저장하기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      const setRecruitmentData = (_recruitment_data) => {
        const _now_year = _today.getFullYear();
        const _set_date = [];
        for (let i = 1; i <= 12; i++) {
          i > 9
            ? _set_date.push([_ary_month[i - 1], _now_year + "-" + i])
            : _set_date.push([_ary_month[i - 1], _now_year + "-0" + i]);
        }
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
          });
        }
      };
      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 데이터 셋 받아오기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      const getRecruitmentData = async () => {
        await store.dispatch("root/getRecruitmentData").then((response) => {
          setRecruitmentData(response.data);
          setDaysData();
        });
      };
      getRecruitmentData();
    });
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 데이터 셋 불러오기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const setDaysData = () => {
      state.datas = [];
      state.days.forEach((_item) => {
        let _item_month = _item.month < 10 ? "0" + _item.month : _item.month;
        let _item_day = _item.day < 10 ? "0" + _item.day : _item.day;
        let _month_data =
          store.getters["root/getMonth" + _ary_month[_item.month - 1]];
        let _day_start_data = _month_data.start.filter((_month_item) => {
          return _month_item.start_time.includes(
            _item.year + "-" + _item_month + "-" + _item_day
          );
        });
        let _day_end_data = _month_data.end.filter((_month_item) => {
          return _month_item.end_time.includes(
            _item.year + "-" + _item_month + "-" + _item_day
          );
        });
        let _day_data = {
          year: _item.year,
          month: _item.month,
          day: _item.day,
          start: _day_start_data,
          end: _day_end_data,
        };
        state.datas.push(_day_data);
      });
    };
    const prevBtn = () => {
      let _now_month = store.getters["root/getSelectDay"];
      let _now_prev_year = _now_month.getFullYear();
      let _now_prev_month = _now_month.getMonth();
      if (_now_prev_month == 0) {
        _now_prev_year -= 1;
        _now_prev_month = 12;
      }
      _now_prev_month =
        _now_prev_month > 9 ? _now_prev_month : "0" + _now_prev_month;
      let _now_prev_date = new Date(
        _now_prev_year + "-" + _now_prev_month + "-" + "01"
      );
      state.year = _now_prev_year + "." + _now_prev_month;
      setDays(_now_prev_date);
      setDaysData();
      store.commit("root/setSelectDay", _now_prev_date);
    };

    const nextBtn = () => {
      let _now_month = store.getters["root/getSelectDay"];
      let _now_next_year = _now_month.getFullYear();
      let _now_next_month = _now_month.getMonth() + 2;
      if (_now_next_month > 12) {
        _now_next_year += 1;
        _now_next_month = 1;
      }
      _now_next_month =
        _now_next_month > 9 ? _now_next_month : "0" + _now_next_month;
      let _now_next_date = new Date(
        _now_next_year + "-" + _now_next_month + "-" + "01"
      );
      state.year = _now_next_year + "." + _now_next_month;
      setDays(_now_next_date);
      setDaysData();
      store.commit("root/setSelectDay", _now_next_date);
    };

    const openModal = (_recruit_data) => {
      console.log(_recruit_data);
      state.modal_data = _recruit_data;
      state.modal = true;
    };
    const closeModal = () => {
      state.modal = false;
    };
    return { state, setDaysData, prevBtn, nextBtn, openModal, closeModal };
  },
};
</script>
