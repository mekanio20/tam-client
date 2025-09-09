import { defineStore } from "pinia";

export const useAuthStore = defineStore("app", () => {
  const isRefreshing = sessionStorage.getItem("isRefresh");
  if (isRefreshing) {
  }
});