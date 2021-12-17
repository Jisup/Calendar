<template lang="">
  <div class="recruit-title" @click="openModal">
    <div v-if="state_type == '시'" class="recruit-state back-orange">
      <span class="recruit-state-type">{{ state_type }}</span>
    </div>
    <div v-else class="recruit-state back-darkgray">
      <span class="recruit-state-type">{{ state_type }}</span>
    </div>
    <div class="recruit-name">{{ name }}</div>
  </div>
</template>
<script>
import "@/style/Recruitment.css";
export default {
  name: "recruitment",
  props: {
    id: Number,
    name: String,
    content: String,
    image: String,
    start_time: String,
    end_time: String,
    state_type: String,
  },
  setup(props, { emit }) {
    const openModal = () => {
      let _emit_data = {
        id: props.id,
        name: props.name,
        content: props.content,
        image: props.image,
        start_time: props.start_time,
        end_time: props.end_time,
        state_type: props.state_type,
      };
      emit("open", _emit_data);
    };
    return { openModal };
  },
};
</script>
<style lang=""></style>
