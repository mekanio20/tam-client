import { defineStore } from "pinia";
import { useToast } from "@/composables/useToast.js";
import api from "@/api/index.js";

export const useLikesStore = defineStore("likes", () => {
  // --- State ---
  const likes = ref([]);
  const currentLike = ref({});
  const loading = ref(false);
  const error = ref(null);

  // Toast composable
  const { success, handleApiError } = useToast();

  // --- Actions ---

  // 1) Create like (POST /likes/)
  const createLike = async (productId) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/likes/", { product: productId });
      likes.value.unshift(data);
      success("Added to Favorites", "Product has been added to your favorites");
      return data;
    } catch (err) {
      error.value = err.message || "Failed to like the product";
      handleApiError(err, "Failed to like the product");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 2) List likes (GET /likes/)
  const fetchLikes = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/likes/", { params: {...queryParams, page_size: 1000 } });
      likes.value = data.results;
      return data.results;
    } catch (err) {
      error.value = err.message || "Failed to fetch likes";
      handleApiError(err, "Failed to fetch likes");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 3) Like detail (GET /likes/{id}/)
  const fetchLikeDetail = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/likes/${id}/`);
      currentLike.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch like detail";
      handleApiError(err, "Failed to fetch like detail");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 4) Delete like (DELETE /likes/{id}/)
  const deleteLike = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/likes/${id}/`);
      likes.value = likes.value.filter((item) => item.id !== id);
      if (currentLike.value?.id === id) currentLike.value = {};
      success("Removed from Favorites", "Product has been removed from your favorites");
      return true;
    } catch (err) {
      error.value = err.message || "Failed to remove like";
      handleApiError(err, "Failed to remove like");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Helpers
  const isProductLiked = (productId) => {
    return likes.value.some((item) => item.product === productId);
  };

  return {
    // State
    likes,
    currentLike,
    loading,
    error,
    // Actions
    createLike,
    fetchLikes,
    fetchLikeDetail,
    deleteLike,
    // Helpers
    isProductLiked,
  };
});


