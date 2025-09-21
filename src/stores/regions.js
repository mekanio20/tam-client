import api from "@/api/index.js";

export const useRegionsStore = defineStore("regions", () => {
  // --- State ---
  const regions = ref([]);
  const region_info = ref({});
  const regionsCount = ref(0);
  const deliveryMethods = ref([]);
  const deliveryMethodsCount = ref(0);
  const loading = ref(false);
  const error = ref(null);

  // --- Actions ---

  // (GET /regions/)
  const fetchRegions = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/regions/", { params: queryParams });
      regionsCount.value = data?.count ?? 0;
      regions.value = data?.results ?? data ?? [];
      return regions.value;
    } catch (err) {
      error.value = err.message || "Regions fetch failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (GET /regions/:id/)
  const fetchRegion = async (id) => {
    error.value = null;
    try {
      const { data } = await api.get(`/regions/${id}/`);
      region_info.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Region not found";
      throw err;
    }
  };

  // (GET /delivery-methods/)
  const fetchDeliveryMethods = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/delivery-methods/", { params: queryParams });
      deliveryMethodsCount.value = data?.count ?? 0;
      deliveryMethods.value = data?.results ?? data ?? [];
      return deliveryMethods.value;
    } catch (err) {
      error.value = err.message || "Delivery methods fetch failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // state
    regions,
    region_info,
    regionsCount,
    deliveryMethods,
    deliveryMethodsCount,
    loading,
    error,
    // actions
    fetchRegions,
    fetchRegion,
    fetchDeliveryMethods,
  };
});
