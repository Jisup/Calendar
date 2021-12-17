<template>
  <div class="modal">나는모달</div>
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
