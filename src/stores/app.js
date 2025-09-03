import { defineStore } from "pinia";
import api from "@/api/index.js";

export const useAuthStore = defineStore("app", () => {
    const isRefreshing = sessionStorage.getItem('isRefresh')
    if (isRefreshing) {
        
    }
})