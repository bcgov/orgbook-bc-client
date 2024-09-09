import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Search from "@/views/Search.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/entity/:sourceId/type/:type",
    name: "Entity",
    component: () =>
      import(/* webpackChunkName: "entity" */ "@/views/Entity.vue"),
  },
  {
    path: "/entity/:sourceId/type/:type/credential/:credentialId",
    name: "Credential",
    component: () =>
      import(/* webpackChunkName: "credential" */ "@/views/Credential.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "@/views/Contact.vue"),
  },
  {
    path: "*",
    name: "Not Found",
    beforeEnter: (to, from, next) => {
      next({ name: "Search" });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

export default router;
