import { defineStore } from "pinia";
import api from "@/api/index.js";

export const useCategoriesStore = defineStore("categories", () => {
  // --- State ---
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // --- Actions ---

  // 1. (GET /categories)
  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/categories");
      categories.value = data;
    } catch (err) {
      error.value = err.message || "Category not found";
    } finally {
      loading.value = false;
    }
  };

  // 2. (POST /categories)
  const addCategory = async (payload) => {
    try {
      const { data } = await api.post("/categories", payload);
      categories.value.push(data);
      return data;
    } catch (err) {
      error.value = err.message || "Category not created";
      throw err;
    }
  };

  // 3. (PUT /categories/:id)
  const updateCategory = async (id, payload) => {
    try {
      const { data } = await api.put(`/categories/${id}`, payload);
      const index = categories.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        categories.value[index] = data;
      }
      return data;
    } catch (err) {
      error.value = err.message || "Category not updated";
      throw err;
    }
  };

  // 4. (DELETE /categories/:id)
  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      categories.value = categories.value.filter((c) => c.id !== id);
    } catch (err) {
      error.value = err.message || "Category not deleted";
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
});