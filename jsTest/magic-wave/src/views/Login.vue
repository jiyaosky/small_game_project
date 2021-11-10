<template>
  <div class="container d-flex justify-content-center align-items-center root">
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
              <h4 class="text-dark m-0 fw-bolder">登录</h4>
              <router-link class="text-primary" to="/signup"
                >还没有账号？</router-link
              >
            </div>
            <app-input
              v-model="usernameOrPhone"
              label="用户名或手机号"
              placeholder="username or phone"
            />
            <app-input
              v-model="password"
              label="密码"
              password="true"
              placeholder="password"
            />
            <div class="mb-3 text-end">
              <router-link class="text-primary" to="/login"
                >忘记密码？</router-link
              >
            </div>
            <div class="d-grid gap-2 mb-2">
              <button class="btn btn-dark" :disabled="loginFlag" @click="login">
                登 录
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
      usernameOrPhone: "",
      password: "",
    };
  },
  computed: {
    loginFlag() {
      const flag = this.usernameOrPhone.length > 0 && this.password.length > 0;
      if (flag) {
        return false;
      } else {
        return true;
      }
    },
  },
  // methods: {
  //   login() {
  //     axios
  //       .post("api/auth/login/", {
  //         username_or_phone: this.usernameOrPhone,
  //         password: this.password,
  //       })
  //       .then((res) => {
  //         localStorage.setItem("jwt", res.data.token);
  //         this.$router.push("/dashboard");
  //       })
  //       .catch((err) => {
  //         switch (err.response.data.status) {
  //           case "User not exists.":
  //             alert("用户不存在！");
  //             break;
  //           case "Wrong password.":
  //             alert("用户名或密码错误！");
  //             break;
  //         }
  //       });
  //   },
  // },
};
</script>

<style scoped>
.root {
  width: 100vw;
  height: 100vh;
}
.card-customize {
  width: 24rem;
}
</style>
