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
            <div>
                <label class="form-label">请上传图片</label>
                <input type="file" class="dl-none" name="picture" @change="getPicture"/>
            </div> 
            <select class="mt-4" v-model="type" name="type">
              <option value="">请选择3d类型</option>
              <option value="js">three.js</option>
              <option value="gltf">gltf模型</option>
            </select>

            <div class="mt-2 mb-3">
              <label class="form-label">请上传相应文件</label>
              <div class="row align-items-center">
                <div class="col-10 pe-0">
                    <input type="file" class="dl-none" name="3dfile" @change="getFiles"/>
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 mb-2">
              <button
                class="btn btn-dark"
                :disabled="signUpFlag"
                @click="signUp"
                to="/" 
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
import Home from "../views/Home.vue";
var home = Home

export default {
  components: {
    AppInput
    // SignFooter,
  },
  data() {
    return {
      title: "",
      picture: {},
      type: "",
      file: [],
    };
  },
  computed: {
  },
  methods: {
      getPicture(e) {
        var files = e.target.files || e.dataTransfer.files;
        console.log(files)
        if (!files.length)
          return;
        this.picture = files[0];
        console.log(this.picture)
        this.savePicture(this.picture)
      },
      savePicture(pic) {
        var reader = new FileReader();
        reader.readAsDataURL(pic);
        console.log(pic.name);

        var data = new Blob([pic],{type:"charset=UTF-8"})
        var downloadUrl = window.URL.createObjectURL(data);
        console.log(downloadUrl);
        var anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = pic.name;
        anchor.click();
        window.URL.revokeObjectURL(data);
      },      
      getFiles(e) {
        console.log(this.type)
        var files = e.target.files || e.dataTransfer.files;
        console.log(files)
        if (!files.length)
          return;
        this.file = files[0];
        console.log(this.file)
        this.getFiles(this.file)
      },
      savefiles(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var data = new Blob([file],{type:"charset=UTF-8"})
        var downloadUrl = window.URL.createObjectURL(data);
        console.log(downloadUrl);
        var anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = file.name;
        anchor.click();
        window.URL.revokeObjectURL(data);
      },
      signUp(){
        const cache = localStorage.getItem("list") 
        home.methods.addDiv(cache)
      }
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
