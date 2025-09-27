import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // DEVELOPMENT
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test.vue"),
  },
  // PRODUCTION
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/product/list",
    name: "ProductList",
    component: () => import("@/views/ProductList.vue"),
  },
  {
    path: "/product/search",
    name: "SearchResults",
    component: () => import("@/views/SearchResults.vue"),
  },
  {
    path: "/product/detail/:id",
    name: "ProductDetail",
    component: () => import("@/views/ProductDetail.vue"),
  },
  {
    path: "/account/favorites",
    name: "AccountFavorite",
    component: () => import("@/views/AccountFavorite.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("@/views/Categories.vue"),
  },
  {
    path: "/subcategories/:id",
    name: "Subcategories",
    component: () => import("@/views/Subcategories.vue"),
  },
  // ACCOUNT
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"),
  },
  {
    path: "/account/basket",
    name: "Basket",
    component: () => import("@/views/Basket.vue"),
  },
  {
    path: "/account/confirm/order",
    name: "ConfirmOrder",
    component: () => import("@/views/ConfirmOrder.vue"),
  },
  {
    path: "/account/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
  },
  {
    path: "/account/order/detail/:id",
    name: "OrderDetail",
    component: () => import("@/views/OrderDetail.vue"),
  },
  {
    path: "/receipt/:id",
    name: "Invoice",
    component: () => import("@/views/Invoice.vue"),
  },
  {
    path: "/account/coupons",
    name: "Coupons",
    component: () => import("@/views/Coupons.vue"),
  },

  // CONTACT
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Contact.vue"),
  },
  // ABOUT
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  // FAQ
  {
    path: "/faq",
    name: "Faq",
    component: () => import("@/views/Faq.vue"),
  },
  // NOT FOUND
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;