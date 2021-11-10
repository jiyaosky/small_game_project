<template>
  <navbar />
  <sidebar />

  <div class="d-flex">
    <div class="sidebar-space"></div>

    <div class="main px-xxl-5 px-4 py-4 ">
      <div class="row row-cols-xxl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
        <div class="col" v-for="n in 16" :key="n">
          <scene-wrap-col
            cover="cover.png"
            avatar="avatar.jpg"
            title="这里写的是虚拟资源的名称，最多只显示两行，如果超过两行，超出的部分会变成省略号，不信你可以试一试"
            uploader="jy"
            entry="2333"
            time="3天前"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import SceneWrapCol from "../components/scene/SceneWrapCol.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    Navbar,
    SceneWrapCol,
    Sidebar,
  },
};
</script>

<style scoped>
.main {
  flex: 1;
}
.sidebar-space {
  width: 175px;
}
@media (max-width: 992px) {
  .sidebar-space {
    width: 120px;
  }
}
@media (max-width: 768px) {
  .sidebar-space {
    width: 50px;
  }
}
</style>
