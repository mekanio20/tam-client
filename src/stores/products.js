import api from "@/api/index.js";

export const useProductsStore = defineStore("products", () => {
  // --- State ---
  const products = ref([]);
  const product_info = ref({});
  const loading = ref(false);
  const error = ref(null);
  // --- Actions ---

  // 1. (GET /catalog/client/)
  const fetchProducts = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/catalog/client/", {
        params: { ...queryParams, is_available: true },
      });
      products.value = data.results;
    } catch (err) {
      error.value = err.message || "Product not found";
    } finally {
      loading.value = false;
    }
  };

  // 2. (GET /catalog/client/newest/)
  const fetchNewestProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/catalog/client/newest/");
      products.value = data.results;
    } catch (err) {
      error.value = err.message || "Product not found";
    } finally {
      loading.value = false;
    }
  };

  // 3. (GET /catalog/client/oldest/)
  const fetchOldestProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/catalog/client/oldest/");
      products.value = data.results;
    } catch (err) {
      error.value = err.message || "Product not found";
    } finally {
      loading.value = false;
    }
  };

  // 4. (GET /catalog/client/most_liked/)
  const fetchMostLikedProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/catalog/client/most_liked/");
      products.value = data.results;
    } catch (err) {
      error.value = err.message || "Product not found";
    } finally {
      loading.value = false;
    }
  };

  // 5. (GET /catalog/client/most_purchased/)
  const fetchMostPurchasedProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/catalog/client/most_purchased/");
      products.value = data.results;
    } catch (err) {
      error.value = err.message || "Product not found";
    } finally {
      loading.value = false;
    }
  };

  // 6. (GET /catalog/client/:id/)
  const fetchProduct = async (id) => {
    try {
      const { data } = await api.get(`/catalog/client/${id}/`);
      product_info.value = data;
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
    fetchNewestProducts,
    fetchOldestProducts,
    fetchMostLikedProducts,
    fetchMostPurchasedProducts,
    fetchProduct,
  };
});
