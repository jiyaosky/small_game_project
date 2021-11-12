<template>
  <div class="d-flex mb-4">
    <img class="avatar" :src="require(`../../assets/${avatar}`)" alt="avatar" />

    <div class="ms-md-3 ms-2">
      <router-link to="/">
        <h6 class="fw-bold mb-1">{{ uploader }}</h6>
      </router-link>
      <p class="text-dark mb-1 fs-small">{{ comment }}</p>
      <div class="d-flex align-items-center text-secondary fs-small">
        <span class="me-4">{{ time }}</span>

        <i class="bi bi-hand-thumbs-up-fill"></i>
        <span class="ms-1">{{ like }}</span>

        <i class="bi bi-hand-thumbs-down-fill ms-4"></i>

        <button class="btn btn-sm ms-4">回复</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["avatar", "uploader", "comment", "time", "like"],
};
</script>

<style scoped>
h6 {
  font-size: 14px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.fs-small {
  font-size: 14px;
}
@media (max-width: 992px) {
  .fs-small {
    font-size: 12px;
  }
}
@media (max-width: 576px) {
  h6 {
    font-size: 12px;
  }
  .avatar {
    width: 35px;
    height: 35px;
  }
}
</style>
