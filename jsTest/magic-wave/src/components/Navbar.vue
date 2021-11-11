<template>
  <nav
    class="fixed-top d-flex justify-content-between align-items-center bg-white text-dark px-lg-5 px-md-4 px-sm-3 px-2 py-2"
  >
    <h2 class="ms-2 mb-0">
      <router-link class="text-dark" to="/">展示平台</router-link>
    </h2>

    <div class="d-sm-flex d-none justify-content-between border">
      <div class="p-1 input-wrap">
        <input class="w-100 ms-2" type="text" placeholder="搜索" />
      </div>
      <div class="d-flex justify-content-center align-items-center search">
        <i class="bi bi-search"></i>
      </div>
    </div>

    <div class="d-flex align-items-center">
      <router-link class="d-sm-none ms-lg-4 ms-3 nav-item" to="/">
        <i class="bi bi-search"></i>
        <span> 搜索</span>
      </router-link>
      <router-link class="ms-lg-4 ms-3 nav-item" to="/new/scene">
        <i class="bi bi-envelope"></i>
        <span> 新增</span>
      </router-link>
      <router-link class="ms-lg-4 ms-3 nav-item" to="/">
        <i class="bi bi-envelope"></i>
        <span> 消息</span>
      </router-link>
      <router-link class="ms-lg-4 ms-3 nav-item" to="/">
        <i class="bi bi-cloud-arrow-up"></i>
        <span> 创作</span>
      </router-link>
      <router-link class="ms-lg-4 ms-3" to="/login">
        <img class="avatar" src="../assets/avatar.jpg" alt="avatar" />
      </router-link>
    </div>
  </nav>

  <div class="space"></div>
</template>

<style scoped>
nav {
  height: 55px;
}
h2 {
  font-size: 32px;
}
input {
  border: none;
  outline: none;
}
.input-wrap {
  width: 450px;
}
.search {
  width: 60px;
  background-color: #e7e7e7;
}
.nav-item {
  color: #888;
}
.nav-item:hover {
  color: #000;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.space {
  height: 55px;
}
@media (max-width: 992px) {
  h2 {
    font-size: 28px;
  }
  .input-wrap {
    width: 325px;
  }
}
@media (max-width: 768px) {
  h2 {
    font-size: 24px;
  }
  .input-wrap {
    width: 200px;
  }
}
@media (max-width: 576px) {
  .nav-item {
    font-size: 14px;
  }
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
