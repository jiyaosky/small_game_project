<template>
  <aside class="position-fixed h-100 bg-white d-flex justify-content-between">
    <div class="py-4">
      <router-link
        to="/"
        class="text-dark d-flex justify-content-center align-items-center py-2 link"
      >
        <i class="bi bi-house-door"></i>
        <span class="d-md-inline d-none mx-2">首页</span>
      </router-link>
      <router-link
        to="/"
        class="text-dark d-flex justify-content-center align-items-center py-2 link"
      >
        <i class="bi bi-compass"></i>
        <span class="d-md-inline d-none mx-2">探索</span>
      </router-link>
      <router-link
        to="/"
        class="text-dark d-flex justify-content-center align-items-center py-2 link"
      >
        <i class="bi bi-person-plus"></i>
        <span class="d-md-inline d-none mx-2">关注</span>
      </router-link>
      <router-link
        to="/"
        class="text-dark d-flex justify-content-center align-items-center py-2 link"
      >
        <i class="bi bi-clock-history"></i>
        <span class="d-md-inline d-none mx-2">历史</span>
      </router-link>
      <router-link
        to="/"
        class="text-dark d-flex justify-content-center align-items-center py-2 link"
      >
        <i class="bi bi-star"></i>
        <span class="d-md-inline d-none mx-2">收藏</span>
      </router-link>
    </div>

    <div class="d-lg-block d-none p-4 footer">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <a
          class="text-secondary ms-2"
          href="/"
          target="_blank"
          >关于</a
        >
        <a
          class="text-secondary me-2"
          href="/"
          target="_blank"
          >联系</a
        >
      </div>
      <div class="d-flex justify-content-between align-items-center mb-1">
        <a
          class="text-secondary ms-2"
          href=""
          target="_blank"
          >创作协议</a
        >
        <a
          class="text-secondary me-2"
          href=""
          target="_blank"
          >隐私条款</a
        >
      </div>
      <div class="text-secondary ms-2 mb-1">&copy; 2021 xxx</div>
      <a
        class="d-block text-secondary text-center smallest"
        href="/"
        target="_blank"
        >xxxx</a
      >
    </div>

    <div class="d-lg-none d-md-block d-none p-2 py-4 footer">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <a
          class="text-secondary ms-4"
          href="/"
          target="_blank"
          >关于</a
        >
        <a
          class="text-secondary me-4"
          href="/"
          target="_blank"
          >联系</a
        >
      </div>
      <div class="d-flex justify-content-between align-items-center mb-1">
        <a
          class="text-secondary ms-4"
          href="/"
          target="_blank"
          >创作</a
        >
        <a
          class="text-secondary me-4"
          href="/"
          target="_blank"
          >隐私</a
        >
      </div>
      <div class="text-secondary text-center mb-1">&copy; 2021 xxx</div>
      <a
        class="d-block text-secondary text-center smallest"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        >xxxx</a
      >
    </div>
  </aside>
</template>

<style scoped>
aside {
  width: 190px;
  flex-direction: column;
}
i {
  font-size: 1.3rem;
}
.link {
  font-size: 18px;
}
.link:hover {
  background-color: #eee;
}
.space {
  height: 55px;
}
.footer {
  margin-bottom: 55px;
  font-size: 12px;
}
@media (max-width: 992px) {
  aside {
    width: 120px;
    flex-direction: column;
  }
  i {
    font-size: 1rem;
  }
  .link {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  aside {
    width: 50px;
    flex-direction: column;
  }
  i {
    font-size: 1.3rem;
  }
}
</style>
