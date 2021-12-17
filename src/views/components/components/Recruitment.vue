<template lang="">
  <div class="recruit-title">{{ state }}-{{ name }}</div>
  <Modal
    v-model="state.modal"
    :id="id"
    :name="name"
    :content="content"
    :image="image"
    :start_time="start_time"
    :end_time="end_time"
  ></Modal>
</template>
<script>
import "@/style/Recruitment.css";
import { reactive } from "vue";
import Modal from "./components/Modal.vue";
export default {
  name: "recruitment",
  components: {
    Modal,
  },
  props: {
    id: Number,
    name: String,
    content: String,
    image: String,
    start_time: String,
    end_time: String,
    state_type: String,
  },
  setup() {
    const state = reactive({
      modal: false,
    });
  },
};
</script>
<style lang=""></style>
