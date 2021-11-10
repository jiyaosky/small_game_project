import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Scene from "../views/Scene.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const routes = [
  {
    path: "/",
    component: Home,
    meta: { title: "展示平台 - Imaginary Wave" },
  },
  {
    path: "/scene",
    component: Scene,
    meta: { title: "展示平台 - Imaginary Wave" },
  },
  {
    path: "/login",
    component: Login,
    meta: { title: "展示平台 - 登录 " },
  },
  {
    path: "/signup",
    component: Signup,
    meta: { title: "展示平台 - 注册 " },
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
