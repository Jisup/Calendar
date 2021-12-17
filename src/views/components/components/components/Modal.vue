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
            <span>{{ modal_data.start_time }}</span>
            <span>{{ modal_data.end_time }}</span>
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
import { onMounted } from "vue";
export default {
  name: "modal",
  props: {
    modal_data: Object,
  },
  setup(props, { emit }) {
    onMounted(() => {
      var _modal_content = document.querySelector(".modal-content");
      _modal_content.innerHTML = props.modal_data.content;
    });
    const closeModal = () => {
      emit("close");
    };
    return { closeModal };
  },
};
</script>
