import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // DEVELOPMENT
  {
    path: "/",
    name: "test",
    component: () => import("@/views/test.vue"),
  },
  // PRODUCTION
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/product/list",
    name: "ProductList",
    component: () => import("@/views/ProductList.vue"),
  },
  {
    path: "/product/detail/:id",
    name: "ProductDetail",
    component: () => import("@/views/ProductDetail.vue"),
  },
  {
    path: "/product/favorite",
    name: "ProductFavorite",
    component: () => import("@/views/ProductFavorite.vue"),
  },
  // ACCOUNT
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;