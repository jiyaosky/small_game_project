<template>
  <div class="container d-flex align-items-center justify-content-center root">
    <div>
      <div class="d-flex align-items-center justify-content-center">
        <h2>
          <router-link class="text-dark" to="/">展示平台</router-link>
        </h2>
      </div>

      <div class="d-flex align-items-center justify-content-center mt-4">
        <div class="card mb-5 shadow-sm card-customize">
          <div class="card-body">
            <div
              class="d-flex align-items-center justify-content-between mt-2 mb-4"
            >
              <h4 class="text-dark m-0 fw-bolder">新增</h4>
            </div>
            <app-input
              v-model="title"
              label="请输入标题"
              placeholder="enter your title"
            />
            <!-- <app-input
              v-model="pictures"
              label="请上传图片"
              password="true"
              placeholder="upload your pictures"
            /> -->
            <div>
                <label class="form-label">请上传图片</label>
                <input ref='uploadInput' type= "file" class="dl-none" name="picture" @change="dealfilechange"/>
                <button class="btn btn-primary" @click="uploadgogo">
                    <span>上传</span>
                </button>     
            </div> 
            <select v-model="type" name="type">
              <option value="">请选择3d类型</option>
              <option value="js">three.js</option>
              <option value="gltf">gltf模型</option>
            </select>

            <div class="mb-3">
              <label class="form-label">请上传相应文件</label>
              <div class="row align-items-center">
                <div class="col-10 pe-0">
                  <!-- <input
                    type="text"
                    class="form-control"
                    placeholder="enter verification code"
                    v-model="file"
                  /> -->
                  <div>
                    <input ref='uploadInput' type= "file" class="dl-none" name="icon" @change="dealfilechange"/>
                    <button class="btn btn-primary" @click="uploadgogo">
                        <span>上传</span>
                    </button>     
                  </div> 
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 mb-2">
              <button
                class="btn btn-dark"
                :disabled="signUpFlag"
                @click="signUp"
              >
                上传
              </button>
            </div>
          </div>
        </div>
      </div>

      <sign-footer />
    </div>
  </div>
</template>

<script>
import AppInput from "../components/form/AppInput.vue";
// import SignFooter from "../components/SignFooter.vue";

export default {
  components: {
    AppInput,
    // SignFooter,
  },
  data() {
    return {
      title: "",
      pictures: "",
      type: "",
      file: "",
    };
  },
  computed: {
    codeDisabledFlag() {
      return this.phone.length === 11 ? false : true;
    },

  },
  methods: {
  },
};
</script>

<style scoped>
label {
  font-size: 14px;
}
.root {
  width: 100vw;
  height: 100vh;
}
.card-customize {
  width: 24rem;
}
</style>
