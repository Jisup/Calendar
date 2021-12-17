<template>
  <div class="modal">
    <div class="modal-inner">
      <div>{{ modal_data.id }}</div>
      <div>{{ modal_data.name }}</div>
      <div>{{ modal_data.content }}</div>
      <div>{{ modal_data.content }}</div>
      <div>{{ modal_data.content }}</div>
      <div>{{ modal_data.content }}</div>
      <div>{{ modal_data.content }}</div>
      <div>{{ modal_data.content }}</div>
      <div>{{ modal_data.start_time }}</div>
      <div>{{ modal_data.end_time }}</div>
    </div>
  </div>
</template>
<script>
import "@/style/Modal.css";
export default {
  name: "modal",
  props: {
    modal_data: Object,
  },
  setup(props) {
    console.log(props);
    console.log(props.modal_data);
    console.log(props.modal_data.name);
  },
};
</script>
