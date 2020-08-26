import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/ad",
    name: "ad",
    component: () => import("../views/ad.vue")
  },
  {
    path: "/goods",
    name: "goods",
    component: () => import("../views/Goods.vue")
  },
  {
    path: "/info",
    name: "info",
    component: () => import("../views/Info.vue")
  },
  {
    path: "/mup",
    name: "mup",
    component: () => import("../views/mup.vue")
  },
  {
    path: "/nav",
    name: "nav",
    component: () => import("../views/nav.vue")
  },
  {
    path: "/news",
    name: "news",
    component: () => import("../views/News.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
