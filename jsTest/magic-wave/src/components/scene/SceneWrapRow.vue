<template>
  <router-link class="d-block mb-2" :to="`/scene/${name}`">
    <div class="row">
      <div class="col-6">
        <img class="w-100" :src="require(`../../assets/${cover}`)" />
      </div>
      <div class="col-6 px-0">
        <p class="text-dark mb-2 title">{{ title }}</p>
        <div class="d-flex align-items-center text-secondary">
          <p
            class="d-sm-flex d-none justify-content-center align-items-center bg-secondary text-light px-1 mb-0 me-1 up-icon"
          >
            UP
          </p>
          <p class="mb-0 fs-small">{{ uploader }}</p>
        </div>
        <div class="text-secondary fs-small">
          <i class="bi bi-eye"></i>
          <span class="ms-1">{{ entry }}次潜入 </span>
          <i class="bi bi-clock ms-2"></i>
          <span class="ms-1">{{ time }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["name" ,"cover", "title", "uploader", "entry", "time"],
};
</script>

<style scoped>
.title {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  height: 40px;
}
.up-icon {
  font-size: 12px;
  border-radius: 5px;
}
.fs-small {
  font-size: 12px;
}
</style>
