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
              <h4 class="text-dark m-0 fw-bolder">注册</h4>
              <router-link class="text-primary" to="/login"
                >已有账号？</router-link
              >
            </div>
            <app-input
              v-model="username"
              label="请输入用户名"
              placeholder="enter your username"
            />
            <app-input
              v-model="password"
              label="请输入密码"
              password="true"
              placeholder="enter your password"
            />
            <app-input
              v-model="phone"
              label="请输入手机号"
              placeholder="enter your phone"
            />
            <div class="mb-3">
              <label class="form-label">请输入验证码</label>
              <div class="row align-items-center">
                <div class="col-8 pe-0">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter verification code"
                    v-model="idCode"
                  />
                </div>
                <div class="col-4 text-end">
                  <button
                    class="btn btn-sm btn-outline-dark"
                    disabled
                    v-if="waitingFlag"
                  >
                    <div class="d-flex align-items-center px-2">
                      <div
                        class="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      <div class="ms-2">{{ this.seconds }}秒</div>
                    </div>
                  </button>
                  <button
                    class="btn btn-sm btn-outline-dark"
                    :disabled="codeDisabledFlag"
                    @click="getIdCode"
                    v-else
                  >
                    获取验证码
                  </button>
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 mb-2">
              <button
                class="btn btn-dark"
                :disabled="signUpFlag"
                @click="signUp"
              >
                注 册
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
import SignFooter from "../components/SignFooter.vue";

export default {
  components: {
    AppInput,
    SignFooter,
  },
  data() {
    return {
      username: "",
      password: "",
      phone: "",
      idCode: "",
      seconds: 60,
      waitingFlag: false,
    };
  },
  computed: {
    codeDisabledFlag() {
      return this.phone.length === 11 ? false : true;
    },
    signUpFlag() {
      const flag =
        this.username.length > 0 &&
        this.password.length > 0 &&
        this.phone.length === 11 &&
        this.idCode.length === 6;
      if (flag) {
        return false;
      } else {
        return true;
      }
    },
  },
  // methods: {
  //   signUp() {
  //     axios
  //       .post("api/auth/register/", {
  //         username: this.username,
  //         password: this.password,
  //         phone: this.phone,
  //         id_code: this.idCode,
  //       })
  //       .then((res) => {
  //         alert("注册成功！");
  //         localStorage.setItem("jwt", res.data.token);
  //         this.$router.push("/dashboard");
  //       })
  //       .catch((err) => {
  //         switch (err.response.data.status) {
  //           case "Phone or username is wrong.":
  //             alert("用户名或电话格式错误！");
  //             break;
  //           case "Identify code not found.":
  //             alert("请先获取验证码！");
  //             break;
  //           case "Wrong identify code.":
  //             alert("验证码错误！");
  //             break;
  //           case "Username/phone exists.":
  //             alert("用户名或电话已存在！");
  //             break;
  //         }
  //       });
  //   },
  //   getIdCode() {
  //     axios
  //       .post("api/idcode/", {
  //         phone: this.phone,
  //       })
  //       .then(() => {
  //         this.waitingFlag = true;
  //         const id = setInterval(() => {
  //           if (this.seconds > 0) {
  //             this.seconds--;
  //           } else {
  //             this.seconds = 60;
  //             this.waitingFlag = false;
  //             clearInterval(id);
  //           }
  //         }, 1000);
  //       })
  //       .catch((err) => {
  //         switch (err.response.data.status) {
  //           case "Phone is wrong.":
  //             alert("电话号码格式错误！");
  //             break;
  //           case "Phone exists.":
  //             alert("电话号码已经注册！");
  //             break;
  //           case "Send failed.":
  //             alert("验证码发送失败！");
  //             break;
  //         }
  //       });
  //   },
  // },
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
