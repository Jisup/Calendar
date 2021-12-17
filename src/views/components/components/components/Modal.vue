<template>
  <div class="modal">
    <div class="modal-inner">
      <img
        src="@/assets/close.png"
        class="modal-btn-close"
        @click="closeModal"
      />
      <div class="modal-top">
        <div class="modal-image-cover">
          <img :src="modal_data.image" class="modal-image" />
        </div>
        <div class="modal-top-right">
          <span>{{ modal_data.name }}</span>
          <div class="modal-date">
            <span>{{ state.start_time[0] }} {{ state.start_time[1] }}</span>
            <span> ~ </span>
            <span>{{ state.end_time[0] }} {{ state.end_time[1] }}</span>
            <span class="modal-date-during-time">{{ state.during_time }}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="modal-content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/style/Modal.css";
import { useStore } from "vuex";
import { reactive, onMounted } from "vue";
export default {
  name: "modal",
  props: {
    modal_data: Object,
  },
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      start_time: "",
      end_time: "",
      during_time: "",
    });
    state.start_time = props.modal_data.start_time.split("T");
    state.start_time[1] = state.start_time[1].split(".")[0].slice(0, 5);
    state.end_time = props.modal_data.end_time.split("T");
    state.end_time[1] = state.end_time[1].split(".")[0].slice(0, 5);

    const setModalTime = (_time) => {
      let _year = _time.getFullYear();
      let _month = _time.getMonth() + 1;
      _month = _month < 10 ? "0" + _month : _month;
      let _day = _time.getDate();
      _day = _day < 10 ? "0" + _day : _day;
      return new Date(_year + "-" + _month + "-" + _day).getTime();
    };
    var _end_time = new Date(props.modal_data.end_time);
    _end_time = setModalTime(_end_time);
    var _now_time = store.getters["root/getToday"];
    _now_time = setModalTime(_now_time);

    if (_end_time > _now_time) {
      state.during_time =
        "(" +
        (Math.floor((_end_time - _now_time) / 1000 / 60 / 60 / 24) + 1) +
        "일 전)";
    } else if (_end_time < _now_time) {
      state.during_time =
        "(" +
        Math.floor((_now_time - _end_time) / 1000 / 60 / 60 / 24) +
        "일 지남)";
    } else {
      state.during_time = "(오늘)";
    }

    onMounted(() => {
      var _modal_content = document.querySelector(".modal-content");
      _modal_content.innerHTML = props.modal_data.content;
    });
    const closeModal = () => {
      emit("close");
    };
    return { state, closeModal };
  },
};
</script>
