<template>
  <div class="d-flex align-items-center me-md-5 me-4 cursor-pointer">
    <i :class="['bi', icon]"></i>
    <span class="ms-1">{{ quantity }}</span>
  </div>
</template>

<script>
export default {
  props: ["icon", "quantity"],
};
</script>

<style scoped>
i {
  font-size: 22px;
}
span {
  font-size: 15px;
}
.cursor-pointer {
  cursor: pointer;
}
@media (max-width: 1200px) {
  i {
    font-size: 20px;
  }
  span {
    font-size: 14px;
  }
}
@media (max-width: 576px) {
  i {
    font-size: 16px;
  }
  span {
    font-size: 12px;
  }
}
</style>
