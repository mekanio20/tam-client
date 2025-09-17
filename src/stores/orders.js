import api from "@/api/index.js";

export const useOrdersStore = defineStore("orders", () => {
  // --- State ---
  const orders = ref([]);
  const order_info = ref({});
  const ordersCount = ref(0);
  const loading = ref(false);
  const error = ref(null);

  // --- Actions ---

  // (GET /orders/)
  const fetchOrders = async (queryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/orders/", { params: queryParams });
      ordersCount.value = data?.count ?? 0;
      orders.value = data?.results ?? data ?? [];
      return orders.value;
    } catch (err) {
      error.value = err.message || "Orders fetch failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (GET /orders/:id/)
  const fetchOrder = async (id) => {
    error.value = null;
    try {
      const { data } = await api.get(`/orders/${id}/`);
      order_info.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Order not found";
      throw err;
    }
  };

  // (POST /orders/)
  const createOrder = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/orders/", payload);
      order_info.value = data;
      // Optimistically add to list if list exists
      orders.value = Array.isArray(orders.value) ? [data, ...orders.value] : [data];
      ordersCount.value = (ordersCount.value || 0) + 1;
      return data;
    } catch (err) {
      error.value = err.message || "Order create failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (PATCH /orders/:id/)
  const updateOrder = async (id, updateData) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.patch(`/orders/${id}/`, updateData);
      order_info.value = data;
      // Sync in list if present
      const idx = Array.isArray(orders.value)
        ? orders.value.findIndex((o) => o.id === id)
        : -1;
      if (idx > -1) {
        orders.value.splice(idx, 1, data);
      }
      return data;
    } catch (err) {
      error.value = err.message || "Order update failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // (DELETE /orders/:id/)
  const deleteOrder = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/orders/${id}/`);
      // Remove from list if present
      const idx = Array.isArray(orders.value)
        ? orders.value.findIndex((o) => o.id === id)
        : -1;
      if (idx > -1) {
        orders.value.splice(idx, 1);
        ordersCount.value = Math.max(0, (ordersCount.value || 1) - 1);
      }
      // If currently viewing this order, clear it
      if (order_info.value?.id === id) {
        order_info.value = {};
      }
      return true;
    } catch (err) {
      error.value = err.message || "Order delete failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // state
    orders,
    order_info,
    ordersCount,
    loading,
    error,
    // actions
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    deleteOrder,
  };
});


