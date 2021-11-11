<template>
  <router-link class="d-block h-100 mb-4" :to="`/scene/${name}`">
    <img class="w-100 mb-2" :src="require(`../../assets/${cover}`)" />

    <div class="d-flex">
      <img
        class="avatar"
        :src="require(`../../assets/${avatar}`)"
        alt="avatar"
      />

      <div class="ms-2">
        <p class="text-dark mb-sm-2 mb-0 title">{{ title }}</p>

        <div class="d-flex align-items-center text-secondary mb-0">
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
  props: ["name","cover", "avatar", "title", "uploader", "entry", "time"],
};
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.title {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  line-height: 22px;
  height: 44px;
}
.up-icon {
  font-size: 12px;
  border-radius: 5px;
}
.fs-small {
  font-size: 14px;
}
@media (max-width: 1200px) {
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .title {
    font-size: 14px;
    line-height: 20px;
    height: 40px;
  }
  .fs-small {
    font-size: 12px;
  }
}
@media (max-width: 768px) {
  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
}
</style>
