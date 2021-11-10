<template>
  <navbar />

  <div class="my-4 mx-xl-4 mx-sm-3 mx-2">
    <div class="d-lg-flex c-row">
      <div class="leftbar">
        <scene-comp :path="modelInfo.path" />

        <h5 class="mt-md-3 mt-2">{{ modelInfo.title }}</h5>
        <div class="text-secondary fs-small">
          <i class="bi bi-eye"></i>
          <span class="ms-1">{{ modelInfo.entry }}次潜入 </span>
          <i class="bi bi-clock ms-2"></i>
          <span class="ms-1">{{ modelInfo.absoluteTime }}</span>
        </div>

        <div class="d-flex align-items-center text-secondary mt-md-3 mt-2 mb-1">
          <scene-icon
            icon="bi-hand-thumbs-up-fill"
            :quantity="modelInfo.like"
          />
          <scene-icon icon="bi-star-fill" :quantity="modelInfo.collection" />
          <scene-icon icon="bi-download" :quantity="modelInfo.download" />
          <scene-icon icon="bi-share-fill" :quantity="modelInfo.share" />
        </div>

        <hr class="m-0" />

        <scene-avatar
          class="mt-md-4 mt-3 mb-md-3 mb-2"
          :avatar="uploaderInfo.avatar"
          :uploader="uploaderInfo.uploader"
          :description="uploaderInfo.description"
          :subscribe="uploaderInfo.subscribe"
        />

        <p class="text-dark mb-md-3 mb-2 fs-small">
          {{ modelInfo.description }}
        </p>

        <hr class="m-0" />

        <h6 class="my-4 comment">{{ modelInfo.comment }} 条评论</h6>

        <div class="mb-4">
          <div class="d-flex align-items-center">
            <img
              class="avatar"
              :src="require(`../assets/${uploaderInfo.avatar}`)"
              alt="avatar"
            />

            <textarea
              class="form-control ms-md-3 ms-2"
              rows="2"
              placeholder="发表一条公开评论"
            ></textarea>
          </div>
          <div class="text-end mt-2">
            <button class="btn btn-sm me-2">
              <i class="bi bi-emoji-smile"></i>
              <span> 表情</span>
            </button>
            <button class="btn btn-sm btn-primary" disabled>评论</button>
          </div>
        </div>

        <scene-comment
          v-for="n in 16"
          :key="n"
          avatar="avatar.jpg"
          uploader="ju"
          comment="xxx"
          time="3天前"
          like="287"
        />
      </div>

      <div class="d-lg-block d-none rightbar">
        <scene-wrap-row
          v-for="n in 16"
          :key="n"
          cover="cover.png"
          title="xxx"
          uploader="jy"
          entry="2333"
          time="3天前"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import SceneComp from "../components/scene/SceneComp.vue";
import SceneWrapRow from "../components/scene/SceneWrapRow.vue";
import SceneIcon from "../components/scene/SceneIcon.vue";
import SceneAvatar from "../components/scene/SceneAvatar.vue";
import SceneComment from "../components/scene/SceneComment.vue";

export default {
  components: {
    Navbar,
    SceneComp,
    SceneWrapRow,
    SceneIcon,
    SceneAvatar,
    SceneComment,
  },
  data() {
    return {
      modelInfo: {
        path: "models/gltf/scene.gltf",
        title:
          "xxxx",
        entry: 2333,
        relativeTime: "3天前",
        absoluteTime: "2021-11-9 14:35:58",
        like: 888,
        collection: 333,
        download: 144,
        share: 99,
        description:
          "",
        comment: 16,
      },
      uploaderInfo: {
        uploader: "jy",
        avatar: "avatar.jpg",
        description: "",
        subscribe: 15,
      },
    };
  },
};
</script>

<style scoped>
textarea {
  resize: none;
  background-color: #efefef;
}
.c-row {
  max-width: 1650px;
  margin: 0 auto;
}
.leftbar {
  flex: 1;
  width: calc(100% - 430px);
}
.rightbar {
  width: 400px;
  margin-left: 30px;
}
.fs-small {
  font-size: 14px;
}
.comment {
  font-size: 18px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
@media (max-width: 1200px) {
  h5 {
    font-size: 18px;
  }
  .leftbar {
    flex: 1;
    width: calc(100% - 320px);
  }
  .rightbar {
    width: 300px;
    margin-left: 20px;
  }
}
@media (max-width: 992px) {
  .leftbar {
    width: 100%;
  }
  .fs-small {
    font-size: 12px;
  }
}
@media (max-width: 576px) {
  h5 {
    font-size: 14px;
  }
  .avatar {
    width: 35px;
    height: 35px;
  }
}
</style>
