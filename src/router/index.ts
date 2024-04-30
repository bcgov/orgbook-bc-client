/// <reference types="vite/client" />

import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Search from "@/views/Search.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/search",
    name: "Search",
    component: Search,
  },

  {
    path: "/entity/:sourceId",
    name: "Entity",
    component: () =>
      import(/* webpackChunkName: "entity" */ "@/views/Entity.vue"),
  },
  {
    path: "/entity/:sourceId/credential/:credentialId",
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
  // {
  //   path: "*",
  //   name: "Not Found",
  //   beforeEnter: (to, from, next) => {
  //     next({ name: "Search" });
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(),
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
