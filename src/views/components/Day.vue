<template>
  <div class="days">
    <div class="day-title">
      <span v-if="month == state.select_month.getMonth() + 1">{{ day }}</span>
      <span v-else>{{ month }}/{{ day }}</span>
    </div>
    <div class="day-content">
      <recruit-ment
        v-for="(re, index) in state.recruit"
        :key="'re' + index"
        :id="re.id"
        :name="re.name"
        :content="re.content"
        :image="re.image"
        :start_time="re.start_time"
        :end_time="re.end_time"
        :state_type="re.state_type"
        @open="openModal"
      ></recruit-ment>
    </div>
  </div>
</template>
<script>
import "@/style/Day.css";
import RecruitMent from "./components/Recruitment.vue";
import { useStore } from "vuex";
import { reactive, computed, watch } from "vue";
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
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      recruit: [],
      select_month: computed(() => store.getters["root/getSelectDay"]),
    });

    const setRecruit = (_data, _type) => {
      var _temp = [];
      _data.forEach((_item) => {
        /*
          새롭게 json데이터를 만들어주지않고 직접적으로 json.state로 처리할경우
          후순위에 적용한 데이터만 삽입된다.
        */
        let _empty = {
          id: _item.id,
          name: _item.name,
          content: _item.content,
          image: _item.image,
          start_time: _item.start_time,
          end_time: _item.end_time,
          state_type: _type,
        };
        _temp.push(_empty);
      });
      _temp = _temp.sort((o1, o2) => {
        return o1.name < o2.name ? -1 : o1.name > o2.name ? 1 : 0;
      });
      _temp.forEach((_temp_item) => {
        state.recruit.push(_temp_item);
      });
    };
    setRecruit(props.start, "시");
    setRecruit(props.end, "끝");
    /*
        Maximum recursive updates exceeded in component<day>. This means you
        have a reactive effect that is mutating its own dependencies and thus
        recursively triggering itself. Possible sources include component template,
        updated hook or watcher source function
    */
    // onUpdated(() => {
    //   state.recruit = [];
    //   setRecruit(props.start, "시");
    //   setRecruit(props.end, "끝");
    // });
    watch(
      () => [props.start, props.end],
      () => {
        state.recruit = [];
        setRecruit(props.start, "시");
        setRecruit(props.end, "끝");
      }
    );

    const openModal = (_recruit_data) => {
      emit("open", _recruit_data);
    };

    return {
      state,
      openModal,
    };
  },
};
</script>
