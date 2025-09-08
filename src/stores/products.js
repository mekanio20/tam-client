import { defineStore } from "pinia";
import api from "@/api/index.js";

export const useProductsStore = defineStore("products", () => {
  // --- State ---
  const products = ref([]);
  const product_info = ref({})
  const loading = ref(false);
  const error = ref(null);
  // --- Actions ---

  // 1. (GET /catalog/client/)
  const fetchProducts = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/catalog/client/", {
        params: queryParams,
      });
      products.value = data;
    } catch (err) {
      error.value = err.message || "Product not found";
    } finally {
      loading.value = false;
    }
  };

  // 2. (GET /catalog/client/:id)
  const fetchProduct = async (id) => {
    try {
      const { data } = await api.get(`/catalog/client/${id}`);
      product_info.value = data
    } catch (err) {
      error.value = err.message || "Product not found";
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProduct,
  };
});
