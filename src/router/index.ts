import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
    children: [
      {
        path: "orgbook-data",
        name: "OrgBook Data",
      },
      {
        path: "digital-trust",
        name: "Digital Trust",
      },
      {
        path: "orgbook-api",
        name: "OrgBook API",
      },
      {
        path: "becoming-an-issuer",
        name: "Becoming an Issuer",
      },
    ],
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "@/views/Contact.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;