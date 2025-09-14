import api from "@/api/index.js";

export const useSubcategoriesStore = defineStore("subcategories", () => {
  // --- State ---
  const subcategories = ref([]);
  const subcategory_info = ref({});
  const loading = ref(false);
  const error = ref(null);

  // --- Actions ---

  // 1. (GET /subcategories/)
  const fetchSubcategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/subcategories/");
      subcategories.value = data.results;
    } catch (err) {
      error.value = err.message || "Subcategory not found";
    } finally {
      loading.value = false;
    }
  };

  // 2. (GET /subcategories/{id}/)
  const fetchSubcategoryDetails = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/subcategories/${id}/`);
      console.log('Subcategory details', data);
      subcategory_info.value = data;
    } catch (err) {
      error.value = err.message || "Subcategory not found";
    } finally {
      loading.value = false;
    }
  };

  return {
    subcategories,
    subcategory_info,
    loading,
    error,
    fetchSubcategories,
    fetchSubcategoryDetails
  };
});
