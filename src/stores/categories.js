import { defineStore } from "pinia";
import api from "@/api/index.js";

export const useCategoriesStore = defineStore("categories", () => {
  // --- State ---
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const bgColors = ["#E2FFF4", "#FFF6E2", "#FFEFE9", "#EEFFCA", "#93E6FF", "#FFEAF5"];
  const circleBgColors = ["#C1FFDC", "#FFE29E", "#FFC8B5", "#DCFB96", "#93E6FF", "#FFC8E5"];

  // --- Actions ---

  // 1. (GET /categories)
  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/categories/");
      categories.value = await data.results.map((cat, index) => {
        const colorIndex = index % 6;
        return {
          ...cat,
          bg_color: bgColors[colorIndex],
          circle_bg_color: circleBgColors[colorIndex],
        };
      });
    } catch (err) {
      error.value = err.message || "Category not found";
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
});
