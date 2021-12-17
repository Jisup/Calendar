<template lang="">
  <div class="recruit-title" @click="openModal">
    {{ state_type }}-{{ name }}
  </div>
  <Modal
    v-model="state.modal"
    :id="id"
    :name="name"
    :content="content"
    :image="image"
    :start_time="start_time"
    :end_time="end_time"
    :state_type="state_type"
    @close="closeModal"
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
    const openModal = () => {
      state.modal = true;
    };
    const closeModal = () => {
      state.modal = false;
    };
    return {
      state,
      openModal,
      closeModal,
    };
  },
};
</script>
<style lang=""></style>
