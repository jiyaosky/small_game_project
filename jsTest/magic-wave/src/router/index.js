import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Scene from "../views/Scene.vue";
import NewScene from "../views/NewScene.vue";
import SceneTank from "../views/SceneTank.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const routes = [
  {
    path: "/",
    component: Home,
    meta: { title: "展示平台" },
  },
  {
    path: "/new/scene",
    component: NewScene,
    meta: { title: "新增场景" },
  },
  {
    path: "/scene/xxx",
    component: Scene,
    meta: { title: "展示平台" },
  },
  {
    path: "/scene/tank",
    component: SceneTank,
    meta: { title: "展示平台" },
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
  {
    path: "/scene/:name",
    component: SceneTank,
    meta: { title: "展示平台" },
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
