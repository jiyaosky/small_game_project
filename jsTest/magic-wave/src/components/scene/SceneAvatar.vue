<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <router-link to="/">
        <img
          class="avatar"
          :src="require(`../../assets/${avatar}`)"
          alt="avatar"
        />
      </router-link>

      <div class="ms-2 identity">
        <router-link to="/">
          <h6 class="fw-bold mb-1">{{ uploader }}</h6>
        </router-link>
        <p class="text-secondary mb-0 fs-small des">{{ description }}</p>
        <p class="text-secondary mb-0 fs-small">{{ subscribe }} 位关注者</p>
      </div>
    </div>

    <div>
      <button class="d-sm-flex d-none align-items-center btn btn-danger">
        <i class="bi bi-plus"></i>
        <span> 关注</span>
      </button>
      <button class="d-sm-none d-flex align-items-center btn btn-sm btn-danger">
        <i class="bi bi-plus"></i>
        <span> 关注</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["avatar", "uploader", "description", "subscribe"],
};
</script>

<style scoped>
i {
  font-size: 20px;
}
h6 {
  font-size: 14px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.fs-small {
  font-size: 12px;
}
.identity {
  max-width: 230px;
}
.des {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (max-width: 576px) {
  i {
    font-size: 13px;
  }
  h6 {
    font-size: 12px;
  }
  .avatar {
    width: 40px;
    height: 40px;
  }
}
</style>
