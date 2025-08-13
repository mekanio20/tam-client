import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // DEVELOPMENT
  {
    path: "/",
    name: "test",
    component: () => import("@/views/test.vue"),
  },
  // PRODUCTION
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;