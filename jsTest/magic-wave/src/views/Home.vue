<template>
  <navbar />
  <sidebar />

  <div class="d-flex">
    <div class="sidebar-space"></div>

    <div class="main px-xxl-5 px-4 py-4 ">
      <div class="row row-cols-xxl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
        <div class="col">
          <scene-wrap-col
            name="xxx"
            cover="gun.png"
            avatar="avatar.jpg"
            title="这里写的是资源的名称"
            uploader="jy"
            entry="2"
            time="2天前"
          />
        </div>
        <div class="col">
          <scene-wrap-col
            name="tank"
            cover="cover.png"
            avatar="avatar.jpg"
            title="资源2"
            uploader="jy"
            entry="2"
            time="1天前"
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
